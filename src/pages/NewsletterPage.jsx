import * as React from "react";
import MyAppBar from "../components/AppBar/MyAppBar";
import NewsCard from "../components/NewsCard/NewsCard";
import { Grid, Container, Typography } from "@mui/material";

export default function NewsletterPage() {
  // Mock data for the news items
  const newsItems = [
    //... populate with your data
  ];

  return (
    <>
      <MyAppBar />
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom>
          Good morning, Soleil. Today is Friday, April 12.
        </Typography>
        {/* Layout your Grid here */}
        <Grid container spacing={4}>
          {newsItems.map((news, index) => (
            <Grid item key={index} xs={12} md={6}>
              <NewsCard {...news} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
