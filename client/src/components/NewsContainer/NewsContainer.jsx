import React, { useEffect, useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import { Box, Typography } from "@mui/material";
import axios from "axios";

function NewsContainer() {
  const [articles, setArticles] = useState([]); // State to hold multiple article objects

  useEffect(() => {
    const sources = [
      "http://localhost:3001/scrape-hollywood",
      "http://localhost:3001/scrape-deadline",
    ];

    // Fetch articles from all sources
    Promise.all(sources.map((url) => axios.get(url)))
      .then((responses) => {
        // Map responses to extract data
        const newArticles = responses.map((response) => response.data);
        setArticles(newArticles);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  if (articles.length === 0)
    return <Typography>No article data available.</Typography>;

  return (
    <Box>
      {articles.map((article, index) => (
        <NewsCard
          key={index}
          title={article.headline}
          summary={"This summary will be AI generated :)"}
          source={article.source} // Make sure your backend provides the 'source' or set it here
          sourceUrl={article.link}
          imageUrl={article.imageUrl}
        />
      ))}
    </Box>
  );
}

export default NewsContainer;
