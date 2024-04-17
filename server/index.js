const express = require("express");
const app = express();
const port = 3001;

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

// Other routes can be added below
// Example: Adding a scrape route
const scrapeHeadline = require("./scraper");
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
