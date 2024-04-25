import React, { useEffect, useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import { Box, Typography } from "@mui/material";
import axios from "axios";

function NewsContainer({ selectedSources }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Map your sources to your scraping endpoints
    const sourceEndpoints = {
      "The Hollywood Reporter": "http://localhost:3001/scrape-hollywood",
      Deadline: "http://localhost:3001/scrape-deadline",
      Variety: "http://localhost:3001/scrape-variety",
      // ... other sources
    };

    // Filter the sources to only those selected by the user
    const filteredSources = Object.entries(sourceEndpoints)
      .filter(([sourceName]) => selectedSources.includes(sourceName))
      .map(([, endpoint]) => endpoint);

    if (filteredSources.length > 0) {
      Promise.all(filteredSources.map((url) => axios.get(url)))
        .then((responses) => {
          // You may need to adjust how you combine and set the articles based on the structure of your response
          const newArticles = responses.flatMap((response) => response.data);
          setArticles(newArticles);
        })
        .catch((error) => {
          console.error("Error fetching news:", error);
        });
    } else {
      // If no sources are selected, clear the articles
      setArticles([]);
    }
  }, [selectedSources]);

  if (articles.length === 0) {
    return <Typography>No article data available.</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {articles.map((article, index) => (
        <NewsCard
          key={index}
          title={article.headline}
          summary={"This summary will be AI generated :)"}
          source={article.source}
          sourceUrl={article.link}
          imageUrl={article.imageUrl}
        />
      ))}
    </Box>
  );
}

export default NewsContainer;
