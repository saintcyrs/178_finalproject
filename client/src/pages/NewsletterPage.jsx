import * as React from "react";
import MyAppBar from "../components/AppBar/MyAppBar";
// TODO: Extract the user's name from SignUpForm
// import SignUpForm from "./SignUpForm";
import NewsContainer from "../components/NewsContainer/NewsContainer";
import { Grid, Container, Typography } from "@mui/material";

// Mock data for the news items
const sections = [
  {
    title: "Top Articles in Entertainment",
    articles: [
      {
        id: 1,
        headline: "Sed ut perspiciatis",
        summary:
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        sourceName: "The Hollywood Reporter",
        sourceUrl: "https://www.hollywoodreporter.com",
      },
      // ... more articles
    ],
  },
];
function formatDate() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date().toLocaleDateString("en-US", options);
}

export default function NewsletterPage() {
  const todayDate = formatDate();

  return (
    <>
      <MyAppBar />
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom>
          Good morning, Soleil. <br></br>
          Today is {todayDate}.
        </Typography>
        <br></br> <br></br>
        {sections.map((section, index) => (
          <div key={index}>
            <Typography variant="h4" gutterBottom>
              {section.title}
            </Typography>
            <Grid container spacing={4}>
              {section.articles.map((article) => (
                <Grid item xs={12} sm={4} key={article.id}>
                  {" "}
                  <NewsContainer
                    title={article.headline}
                    summary={article.summary}
                    source={article.sourceName} // Make sure the property names match what NewsContainer expects
                    sourceUrl={article.sourceUrl}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </Container>
    </>
  );
}
