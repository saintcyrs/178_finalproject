const axios = require("axios");
const cheerio = require("cheerio");

const scrapeHeadline = async (url) => {
  try {
    // Fetch the webpage content
    const response = await axios.get(url);
    const data = response.data;

    // Load the webpage content into Cheerio
    const $ = cheerio.load(data);

    // Select the specific HTML element
    const headlineElement = $(
      "h3.c-title.a-font-primary-l.lrv-u-font-weight-bold.lrv-u-margin-t-1.lrv-u-margin-b-050.lrv-u-color-brand-primary\\:hover a"
    );

    // Extract the headline text and the link
    const headline = headlineElement.text().trim();
    const link = headlineElement.attr("href");

    // Return the extracted data
    return {
      headline,
      link,
    };
  } catch (error) {
    console.error("Failed to scrape:", error);
    throw error; // Re-throw the error or handle it as needed
  }
};

module.exports = scrapeHeadline;
