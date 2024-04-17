import React, { useEffect, useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import { Box, Typography } from "@mui/material";
import axios from "axios";

function NewsContainer() {
  const [article, setArticle] = useState(null); // State to hold the single article object

  useEffect(() => {
    axios
      .get("http://localhost:3001/scrape")
      .then((response) => {
        console.log(response.data);
        setArticle(response.data); // Set the article directly with the response object
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  // Conditional rendering to handle if the article is not yet loaded or if no article data is available
  if (!article) return <Typography>No article data available.</Typography>;

  return (
    <Box>
      {/* Render a single NewsCard with the article data */}
      <NewsCard
        title={article.headline}
        summary={"This will be AI generated :)"} // Assuming no summary is available from the object
        source="The Hollywood Reporter" // Assuming a static source, adjust as needed
        sourceUrl={article.link}
        imageUrl={article.imageUrl} // Add the imageUrl prop with the article's image URL
      />
    </Box>
  );
}

export default NewsContainer;
