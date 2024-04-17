// scraper/index.js
const cron = require("node-cron");
console.log("Before importing scrapeHeadline");
const scrapeHeadline = require("./scraper");
console.log("After importing scrapeHeadline", scrapeHeadline);

// Schedule the scraper to run once a day at midnight (00:00)
cron.schedule("0 0 * * *", () => {
  console.log("Running daily scrape of The Hollywood Reporter");
  scrapeHeadline();
});
