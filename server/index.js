const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Only allow this origin to access your backend
  })
);
const port = 3001;

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

const {
  scrapeHollywoodReporterHeadline,
  scrapeDeadlineFirstHeadline,
  scrapeVarietyHeadline,
  scrapeNYTArticle,
  scrapeFoxNewsArticle,
} = require("./scraper/scraper");

app.get("/scrape-variety", async (req, res) => {
  try {
    const data = await scrapeVarietyHeadline("https://www.variety.com/"); // Make sure this URL is correct and active
    res.json(data);
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
    ); // Make sure this URL is correct and active
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error scraping data", error: error.toString() });
  }
});

// Scraper for Deadline
app.get("/scrape-deadline", async (req, res) => {
  try {
    const data = await scrapeDeadlineFirstHeadline("https://www.deadline.com/"); // Make sure this URL is correct and active
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error scraping data", error: error.toString() });
  }
});

// Endpoint for scraping The New York Times
app.get("/scrape-nyt", async (req, res) => {
  try {
    const data = await scrapeNYTArticle("https://www.nytimes.com/section/politics");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error scraping The New York Times", error: error.toString() });
  }
});

// Endpoint for scraping Fox News
app.get("/scrape-fox", async (req, res) => {
  try {
    const data = await scrapeFoxNewsArticle("https://www.foxnews.com/politics");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error scraping Fox News", error: error.toString() });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
