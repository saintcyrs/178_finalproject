import React, { useEffect, useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import { Box } from "@mui/material";
import axios from "axios";

function NewsContainer({ source }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const sourceEndpoint = {
      "The Hollywood Reporter": "http://localhost:3001/scrape-hollywood",
      Deadline: "http://localhost:3001/scrape-deadline",
      Variety: "http://localhost:3001/scrape-variety",
      "Fox News": "http://localhost:3001/scrape-fox",
      "AP News": "http://localhost:3001/scrape-ap",
      "NBC News": "http://localhost:3001/scrape-nbc",
    };

    Object.values(sourceEndpoint).forEach((url) => {
      axios
        .get(url)
        .then((response) => {
          setArticle(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
        });
    });
  }, [source]);

  if (!article) {
    return <Box>No articles found for {source.name}.</Box>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <NewsCard
        title={article.headline}
        summary={article.summary}
        source={source.name}
        sourceUrl={article.link}
        imageUrl={article.imageUrl}
      />
    </Box>
  );
}

export default NewsContainer;
