import React, { useEffect, useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import { Box, Typography } from "@mui/material";
import axios from "axios";

function NewsContainer({ articlesProp = [] }) {
  const [articles, setArticles] = useState(articlesProp);

  useEffect(() => {
    if (articlesProp.length === 0) {
      const sources = [
        "http://localhost:3001/scrape-hollywood",
        "http://localhost:3001/scrape-deadline",
        "http://localhost:3001/scrape-variety",
      ];

      Promise.all(sources.map((url) => axios.get(url)))
        .then((responses) => {
          const newArticles = responses.map((response) => response.data);
          setArticles(newArticles);
        })
        .catch((error) => {
          console.error("Error fetching news:", error);
        });
    }
  }, [articlesProp]);

  if (articles.length === 0)
    return <Typography>No article data available.</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
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
