import * as React from "react";
//import { useLocation } from 'react-router-dom';
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
  //const location = useLocation();

  //const selectedTopic = location.state?.selectedTopic || '';
  //const sources = NEWS_SOURCES[selectedTopic] || [];

  // TODO: Hard-coded in -- change based on previous selection
  const selectedTopic = "politics";
  const sources = news_sources[selectedTopic];
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = React.useState(null);

  const handleNewsSourceClick = (source) => {
    console.log("News source clicked:", source);
    setSelectedSource(source);
  };

  const handleContinue = () => {
    navigate("/newsletter");
  };

  return (
    <Box className="preferences-container">
      <h1>Hone your preferences:</h1>
      <Box className="selected-topic">
        {selectedTopic && <h2>{selectedTopic}</h2>}
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
              border:
                source.name === selectedSource
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
