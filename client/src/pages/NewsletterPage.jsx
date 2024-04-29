import React, { useEffect, useState } from "react";
import MyAppBar from "../components/AppBar/MyAppBar";
import NewsContainer from "../components/NewsContainer/NewsContainer";
import { Grid, Container, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NewsletterPage() {
  const [selectedSources, setSelectedSources] = useState([]);
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const firstName = storedUserInfo.firstName || "Guest";

  useEffect(() => {
    const storedSources = JSON.parse(
      localStorage.getItem("selectedSources") || "[]"
    );
    setSelectedSources(storedSources.length ? storedSources : []);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <MyAppBar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
          Hello, {firstName}! Welcome to your personalized news dashboard.
        </Typography>
        {selectedSources.length > 0 ? (
          <Slider {...settings}>
            {selectedSources.map((source, index) => (
              <div key={index}>
                <NewsContainer selectedSources={[source]} />
              </div>
            ))}
          </Slider>
        ) : (
          <Typography variant="h5" sx={{ color: "error.main", mt: 2 }}>
            No sources selected. Please select your news sources in preferences.
          </Typography>
        )}
      </Container>
    </>
  );
}

/*

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
        {selectedSources.length > 0 ? (
          <Grid container spacing={3}>
            {selectedSources.map((source, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <NewsContainer selectedSources={[source]} />
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
} */

export default NewsletterPage;
