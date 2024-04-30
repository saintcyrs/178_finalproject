import React, { useEffect, useState } from "react";
import MyAppBar from "../components/AppBar/MyAppBar";
import NewsContainer from "../components/NewsContainer/NewsContainer";
import { Grid, Container, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { fontSize, styled } from "@mui/system";
import { Paper, Chip, Stack } from "@mui/material";

// This creates a global style that overrides the slick slider arrows
const GlobalStyle = styled("div")(({ theme }) => ({
  [`& .slick-prev, & .slick-next`]: {
    backgroundColor: "white", // Your desired background color
    color: "gray", // Arrow icon color
    zIndex: 1,
    fontSize: "40px",
  },
  [`& .slick-prev:before, & .slick-next:before`]: {
    color: "white", // Arrow icon color, ensure it's visible on your background
  },
  [`& .slick-prev`]: {
    left: "-40px",
  },
  [`& .slick-next`]: {
    right: "-40px",
  },
}));

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIcon
      className={className}
      style={{
        ...style,
        display: "block", // Ensure the display isn't none
        color: "black", // Choose color for the arrow
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIcon
      className={className}
      style={{
        ...style,
        display: "block", // Ensure the display isn't none
        color: "black", // Choose color for the arrow
      }}
      onClick={onClick}
    />
  );
};

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

  const slidesToShow = Math.min(selectedSources.length, 3);

  const settings = {
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: selectedSources.length > 1,
    speed: 500,
    slidesToShow: slidesToShow, // Show only one slide if there's one source
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(2, selectedSources.length),
          slidesToScroll: 1,
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
  const LegendChip = styled(Chip)(({ theme, bgcolor }) => ({
    margin: theme.spacing(0.5),
    backgroundColor: bgcolor,
    color: theme.palette.getContrastText(bgcolor),
  }));
  const sourceAlignments = {
    "NBC News": "Tends to be liberally-aligned",
    "AP News": "Tends to be neutrally-aligned",
    "Fox News": "Tends to be conservatively-aligned",
  };

  const legendItems = selectedSources
    .filter((source) => sourceAlignments.hasOwnProperty(source))
    .map((source) => ({
      source,
      alignment: sourceAlignments[source],
    }));

  return (
    <>
      <MyAppBar />
      <Container maxWidth="lg" sx={{ mt: 4, position: "relative", pt: 10 }}>
        {/* Add padding-top to the container to push content down so the legend does not overlap */}
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            position: "relative",
            zIndex: 2,
          }}
        >
          Hello, {firstName}! Welcome to your personalized news dashboard.
        </Typography>

        {selectedSources.length > 0 ? (
          <>
            <GlobalStyle>
              <Slider {...settings}>
                {selectedSources.map((source, index) => (
                  <div key={index}>
                    <NewsContainer selectedSources={[source]} />
                  </div>
                ))}
              </Slider>
            </GlobalStyle>
          </>
        ) : (
          <Typography variant="h5" sx={{ color: "error.main", mt: 2 }}>
            No sources selected. Please select your news sources in preferences.
          </Typography>
        )}
        <Paper
          elevation={3}
          sx={{
            position: "relative",
            padding: "2px",
            zIndex: 5,
          }}
        >
          <Stack direction="column" spacing={0.5}>
            <Typography variant="caption" gutterBottom>
              News Alignment (according to AllSides):
            </Typography>
            {legendItems.map(({ source, alignment }) => (
              <LegendChip
                key={source}
                label={`${source}: ${alignment}`}
                size="small" // Smaller chip size
                bgcolor={
                  alignment.includes("liberally")
                    ? "#1565c0" // Blue
                    : alignment.includes("conservatively")
                    ? "#d32f2f" // Red
                    : "#ffffff" // White
                }
                sx={{
                  border: alignment.includes("neutrally")
                    ? "1px solid black"
                    : "none",
                  fontSize: "0.75rem", // Smaller font size
                }}
              />
            ))}
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default NewsletterPage;
