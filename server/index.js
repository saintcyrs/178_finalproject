const express = require("express");
const cors = require("cors");

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

const scrapeHeadline = require("./scraper/scraper");
console.log(scrapeHeadline);
app.get("/scrape", async (req, res) => {
  try {
    const data = await scrapeHeadline("https://www.hollywoodreporter.com/"); // Make sure this URL is correct and active
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error scraping data", error: error.toString() });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
