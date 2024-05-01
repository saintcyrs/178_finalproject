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
    backgroundColor: "white", 
    color: "gray", 
    zIndex: 1,
    fontSize: "40px",
  },
  [`& .slick-prev:before, & .slick-next:before`]: {
    color: "white", 
  },
  [`& .slick-prev`]: {
    left: "-40px",
  },
  [`& .slick-next`]: {
    right: "-40px",
  },
}));

//The arrow definitions are for the carousel component of the article concept 

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIcon
      className={className}
      style={{
        ...style,
        display: "block", 
        color: "black",
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
        display: "block", 
        color: "black", 
      }}
      onClick={onClick}
    />
  );
};

/*This retrieves the interests and selected sources from the Preferences concept and uses it 
to change the order of articles based on what the user is more interested in. */

function NewsletterPage() {
  const [sortedSources, setSortedSources] = useState([]);
  const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const firstName = storedUserInfo.firstName || "Guest";

  useEffect(() => {
    const storedInterests = JSON.parse(localStorage.getItem("selectedInterests") || "{}");
    const storedSources = JSON.parse(localStorage.getItem("selectedSources") || "[]");
    console.log('stored sources', storedSources);

    // Define the category of each source
    const sourceCategories = {
      'Variety': 'entertainment',
      'Deadline': 'entertainment',
      'The Hollywood Reporter': 'entertainment',
      'Fox News': 'politics',
      'AP News': 'politics',
      'NBC News': 'politics',
    };

    // Function to sort and alternate sources based on interest levels
    function sortSourcesByInterest(sources, interests) {
      // Check interest levels
      const entertainmentLevel = interests.entertainment?.level ?? 0;
      const politicsLevel = interests.politics?.level ?? 0;

      let entertainmentSources = sources.filter(source => sourceCategories[source] === 'entertainment');
      let politicsSources = sources.filter(source => sourceCategories[source] === 'politics');

      if (entertainmentLevel > politicsLevel) {
        return [...entertainmentSources, ...politicsSources];
      } else if (entertainmentLevel < politicsLevel) {
        return [...politicsSources, ...entertainmentSources];
      } else {
        // Alternate if levels are equal
        const maxLength = Math.max(entertainmentSources.length, politicsSources.length);
        const alternatedSources = [];
        for (let i = 0; i < maxLength; i++) {
          if (entertainmentSources[i]) {
            alternatedSources.push(entertainmentSources[i]);
          }
          if (politicsSources[i]) {
            alternatedSources.push(politicsSources[i]);
          }
        }
        return alternatedSources;
      }
    }

    setSortedSources(sortSourcesByInterest(storedSources, storedInterests));
  }, []);

  //The max slides or news cards a user can see at once is 3, which is the hidden vs visible states of the articles.
  const slidesToShow = Math.min(sortedSources.length, 3);

  const settings = {
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: sortedSources.length > 1,
    speed: 500,
    slidesToShow: slidesToShow, // Show only one slide if there's one source
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(2, sortedSources.length),
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

  const legendItems = sortedSources
    .filter((source) => sourceAlignments.hasOwnProperty(source))
    .map((source) => ({
      source,
      alignment: sourceAlignments[source],
    }));

  /*This is the UI rendering of the Newsletter Dashboard. Please check the NewsCard and NewsContainer pages for 
  more information on the UI design behind this page -- UI behind the article concept. */
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

        {sortedSources.length > 0 ? (
          <>
            <GlobalStyle>
              <Slider {...settings}>
                {sortedSources.map((source, index) => (
                  <div key={index}>
                    <NewsContainer sortedSources={[source]} />
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
