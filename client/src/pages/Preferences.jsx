import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import "./Preferences.css";

const news_sources = {
  politics: [
    { name: "CNN", logo: require("../img/cnn.png") },
    { name: "Fox", logo: require("../img/fox.png") },
    { name: "BBC", logo: require("../img/bbc.png") },
  ],
  entertainment: [
    { name: "Variety", logo: require("../img/variety.png") },
    { name: "The Hollywood Reporter", logo: require("../img/hollywood.png") },
    { name: "Deadline", logo: require("../img/deadline.png") },
  ],
};

export default function Preferences() {
  const navigate = useNavigate();
  const storedInterestsJSON = localStorage.getItem("selectedInterests");
  const storedInterests = storedInterestsJSON
    ? JSON.parse(storedInterestsJSON)
    : [];
  const sources = storedInterests.flatMap(
    (interest) => news_sources[interest] || []
  );
  const [selectedSource, setSelectedSource] = useState([]); // Initialize selectedSource as an empty array

  // When source is clicked, add or remove it from selectedSource
  const handleNewsSourceClick = (source) => {
    console.log("News source clicked:", source);
    setSelectedSource((prevSelectedSource) => {
      if (prevSelectedSource.includes(source)) {
        return prevSelectedSource.filter((item) => item !== source);
      } else {
        return [...prevSelectedSource, source];
      }
    });
  };

  const handleContinue = () => {
    localStorage.setItem("selectedSources", JSON.stringify(selectedSource));
    navigate("/newsletter");
  };

  return (
    <Box className="preferences-container">
      <h1>Hone your preferences:</h1>
      <Box className="selected-topic">
        {storedInterests.length > 0 && (
          <h2>
            {storedInterests
              .map(
                (interest) =>
                  interest.charAt(0).toUpperCase() + interest.slice(1)
              )
              .join(", ")}
          </h2>
        )}
      </Box>
      <Box className="search-bar">
        <input type="text" placeholder="Type or select a news source URL" />
      </Box>
      <Box className="news-sources">
        {sources.map((source) => (
          <Box
            key={source.name}
            className="news-source"
            onClick={() => handleNewsSourceClick(source.name)}
            sx={{
              border: selectedSource.includes(source.name)
                ? "2px solid green"
                : "1px solid grey",
              padding: "10px",
              margin: "10px",
              cursor: "pointer",
            }}
          >
            <img
              src={source.logo}
              alt={`${source.name} Logo`}
              className="news-source-logo"
            />
            <Typography>{source.name}</Typography>
          </Box>
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleContinue}
        sx={{ margin: "20px" }}
      >
        Continue
      </Button>
    </Box>
  );
}
