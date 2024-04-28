const express = require("express");
const cors = require("cors");
const app = express();

// Load ESM module dynamically
async function loadOpenAIService() {
  const module = await import("./api/openai-service.mjs");
  return module;
}

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
  scrapeBBCNewsHeadline,
} = require("./scraper/scraper");

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

// Define routes to scrape news sources and potentially save them as articles
app.get("/scrape-variety", async (req, res) => {
  try {
    const data = await scrapeVarietyHeadline("https://www.variety.com/");
    const { analyzeContent } = await loadOpenAIService();
    const summary = await analyzeContent(data.link);
    res.json({ ...data, summary });
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

// Endpoint for scraping Fox News
app.get("/scrape-bbc", async (req, res) => {
  try {
    const data = await scrapeBBCNewsHeadline("https://www.bbc.com/");
    const { analyzeContent } = await loadOpenAIService();
    const summary = await analyzeContent(data.link);
    res.json({ ...data, summary });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error scraping BBC News", error: error.toString() });
  }
});
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
