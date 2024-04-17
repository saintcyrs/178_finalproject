const axios = require("axios");
const cheerio = require("cheerio");

// Scraper for Variety
const scrapeVarietyHeadline = async (url) => {
  try {
    // Fetch the webpage content
    const response = await axios.get(url);
    const data = response.data;

    // Load the webpage content into Cheerio
    const $ = cheerio.load(data);

    const source = "Variety";
    // Extracting the image URL
    const imageUrl = $("article.o-story img.c-lazy-image__img")
      .first()
      .attr("src");

    const headline = $("article.o-story h3.c-title a").first().text().trim();

    const link = $("article.o-story a.c-title__link").first().attr("href");

    return {
      source,
      imageUrl,
      headline,
      link,
    };
  } catch (error) {
    console.error("Failed to scrape:", error);
    throw error; // Re-throw the error or handle it as needed
  }
};

// Scraper for Deadline
const scrapeDeadlineFirstHeadline = async (url) => {
  try {
    // Fetch the webpage content
    const response = await axios.get(url);
    const data = response.data;

    // Load the webpage content into Cheerio
    const $ = cheerio.load(data);

    const source = "Deadline";
    const firstOCard = $(
      ".trending-now .a-scrollable-grid\\@desktop-max > [data-slider-item]"
    ).first();
    let headline = firstOCard.find("h3.c-title").text().trim();
    headline = headline
      .replace(/^\d+\s*/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const link = firstOCard.find("a").attr("href");
    const imageUrl =
      firstOCard.find("img.c-figure__image").attr("src") ||
      firstOCard.find("img.c-figure__image").attr("data-lazy-src");

    // Return the extracted data
    return {
      source,
      headline,
      link,
      imageUrl,
    };
  } catch (error) {
    console.error("Failed to scrape:", error);
    throw error; // Re-throw the error or handle it as needed
  }
};

// Scraper for HollywoodReporter
const scrapeHollywoodReporterHeadline = async (url) => {
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
    const source = "The Hollywood Reporter";
    const headline = headlineElement.text().trim();
    const link = headlineElement.attr("href");
    // Selector for the image based on the provided div and class attributes
    const imageUrl = $(".lrv-a-crop-16x9 img.c-lazy-image__img").attr("src");
    // console.log("Found image element:", imageElement.length > 0); // Should print true if the element is found
    // const imageUrl = imageElement.attr("src");

    // Return the extracted data
    return {
      source,
      headline,
      link,
      imageUrl,
    };
  } catch (error) {
    console.error("Failed to scrape:", error);
    throw error; // Re-throw the error or handle it as needed
  }
};

module.exports = {
  scrapeHollywoodReporterHeadline,
  scrapeDeadlineFirstHeadline,
  scrapeVarietyHeadline,
};
