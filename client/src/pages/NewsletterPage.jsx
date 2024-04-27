import React, { useEffect, useState } from "react";
import MyAppBar from "../components/AppBar/MyAppBar";
import NewsContainer from "../components/NewsContainer/NewsContainer";
import { Grid, Container, Typography } from "@mui/material";

function NewsletterPage() {
  const [selectedSources, setSelectedSources] = useState([]);

  useEffect(() => {
    // Retrieve the selected sources from local storage and ensure it's an array
    const storedSources = localStorage.getItem("selectedSources");
    const parsedSources = storedSources ? JSON.parse(storedSources) : [];
    if (Array.isArray(parsedSources)) {
      setSelectedSources(parsedSources);
    } else {
      console.error("selectedSources is not an array:", parsedSources);
      // Handle the error appropriately
      setSelectedSources([]); // Set to an empty array as fallback
    }
  }, []);

  // Retrieve the user's first name from local storage
  const storedUserInfoString = localStorage.getItem("userInfo");
  const storedUserInfo = storedUserInfoString
    ? JSON.parse(storedUserInfoString)
    : null;
  const firstName = storedUserInfo ? storedUserInfo["firstName"] : undefined;

  const todayDate = formatDate();

  return (
    <>
      <MyAppBar />
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom>
          Hello, {firstName}.
          <br />
          {/* Today is {todayDate}.
          <br /> */}
          Welcome to dsptch, your personalized, consolidated news source.
        </Typography>
        {selectedSources.length > 0 ? (
          <Grid container spacing={2}>
            {selectedSources.map((source, index) => (
              <Grid item xs={12} sm={10} md={4} lg={3} key={index}>
                <NewsContainer selectedSources={[source]} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h5">
            No sources selected. Please select your news sources in preferences.
          </Typography>
        )}
      </Container>
    </>
  );
}

function formatDate() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date().toLocaleDateString("en-US", options);
}

export default NewsletterPage;
