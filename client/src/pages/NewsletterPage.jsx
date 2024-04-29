import React, { useEffect, useState } from "react";
import MyAppBar from "../components/AppBar/MyAppBar";
import NewsContainer from "../components/NewsContainer/NewsContainer";
import { Grid, Container, Typography } from "@mui/material";
import news_sources from './NewsSources.js'; // make sure this path is correct

function NewsletterPage() {
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const firstName = storedUserInfo.firstName || "Guest";

  useEffect(() => {
    const storedInterestLevels = JSON.parse(localStorage.getItem("interestLevels") || "{}");
    const storedSelectedInterests = JSON.parse(localStorage.getItem("selectedInterests") || "[]");
  
    let articlesToDisplay = [];
  
    storedSelectedInterests.forEach(interest => {
      const sourcesArray = news_sources[interest];
      if (sourcesArray) { // Check if the sourcesArray is not undefined
        const level = storedInterestLevels[interest];
        const numArticlesToShow = level < 5 ? 1 : level === 5 ? 2 : 3;
        const sourcesToShow = sourcesArray.slice(0, numArticlesToShow);
        articlesToDisplay = [...articlesToDisplay, ...sourcesToShow];
      }
    });
  
    setDisplayedArticles(articlesToDisplay);
  }, []);  

  return (
    <>
      <MyAppBar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Hello, {firstName}! Welcome to your personalized news dashboard.
        </Typography>
        {displayedArticles.length > 0 ? (
          <Grid container spacing={3}>
            {displayedArticles.map((source, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={`${source.name}-${index}`}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <NewsContainer source={source} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h5" sx={{ color: "error.main", mt: 2 }}>
            No sources selected. Please select your news sources in preferences.
          </Typography>
        )}
      </Container>
    </>
  );
}

export default NewsletterPage;
