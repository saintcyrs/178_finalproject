const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Connect to MongoDB - Ensure you have MongoDB running locally
mongoose
  .connect("mongodb://localhost:27017/newsAggregator", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Load ESM module dynamically
async function loadOpenAIService() {
  const module = await import("./api/openai-service.mjs");
  return module;
}

const Article = require("../client/src/models/article");
const Source = require("../client/src/models/source");

app.use(
  cors({
    origin: "http://localhost:3000", // Only allow this origin to access your backend
  })
);
app.use(express.json()); // Middleware to parse JSON bodies

const {
  scrapeHollywoodReporterHeadline,
  scrapeDeadlineFirstHeadline,
  scrapeVarietyHeadline,
  scrapeNYTArticle,
  scrapeFoxNewsArticle,
} = require("./scraper/scraper");

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

// Endpoint to handle upvotes for sources
app.post("/api/upvote/:sourceId", async (req, res) => {
  try {
    const source = await Source.findById(req.params.sourceId);
    if (!source) return res.status(404).send("Source not found");

    source.score += 1; // Increment score
    await source.save();
    res.status(200).json(source);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating upvote", error: error.toString() });
  }
});

// Endpoint to handle downvotes for sources
app.post("/api/downvote/:sourceId", async (req, res) => {
  try {
    const source = await Source.findById(req.params.sourceId);
    if (!source) return res.status(404).send("Source not found");

    source.score -= 1; // Decrement score
    source.visible = source.score >= 0; // Toggle visibility based on score
    await source.save();
    res.status(200).json(source);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating downvote", error: error.toString() });
  }
});

// Define routes to scrape news sources and potentially save them as articles
app.get("/scrape-variety", async (req, res) => {
  try {
    const data = await scrapeVarietyHeadline("https://www.variety.com/");
    const article = new Article({
      title: data.headline,
      summary: "This summary will be AI generated :)",
      source: data.source,
      link: data.link,
      imageUrl: data.imageUrl,
    });
    await article.save();
    res.json(article);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error scraping data", error: error.toString() });
  }
});

// Scraper for Hollywood Reporter
app.get("/scrape-hollywood", async (req, res) => {
  try {
    const data = await scrapeHollywoodReporterHeadline(
      "https://www.hollywoodreporter.com/"
    );
    const { analyzeContent } = await loadOpenAIService();
    const summary = await analyzeContent(data.link);
    res.json({ ...data, summary });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error scraping data", error: error.toString() });
  }
});

// Scraper for Deadline
app.get("/scrape-deadline", async (req, res) => {
  try {
    const data = await scrapeDeadlineFirstHeadline("https://www.deadline.com/");
    const { analyzeContent } = await loadOpenAIService();
    const summary = await analyzeContent(data.link);
    res.json({ ...data, summary });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error scraping data", error: error.toString() });
  }
});

// Endpoint for scraping The New York Times
app.get("/scrape-nyt", async (req, res) => {
  try {
    const data = await scrapeNYTArticle(
      "https://www.nytimes.com/section/politics"
    );
    const { analyzeContent } = await loadOpenAIService();
    const summary = await analyzeContent(data.link);
    res.json({ ...data, summary });
  } catch (error) {
    res.status(500).json({
      message: "Error scraping The New York Times",
      error: error.toString(),
    });
  }
});

// Endpoint for scraping Fox News
app.get("/scrape-fox", async (req, res) => {
  try {
    const data = await scrapeFoxNewsArticle("https://www.foxnews.com/politics");
    const { analyzeContent } = await loadOpenAIService();
    const summary = await analyzeContent(data.link);
    res.json({ ...data, summary });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error scraping Fox News", error: error.toString() });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
