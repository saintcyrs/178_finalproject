import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
  Slider,
  Paper,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import "./Preferences.css"; // Make sure this CSS file contains all the styles needed for both interests and preferences

const news_sources = {
  politics: [
    { name: "AP News", logo: require("../img/ap.png") },
    { name: "Fox News", logo: require("../img/fox.png") },
    { name: "NBC News", logo: require("../img/nbc.png") },
  ],
  entertainment: [
    { name: "Variety", logo: require("../img/variety.png") },
    { name: "The Hollywood Reporter", logo: require("../img/hollywood.png") },
    { name: "Deadline", logo: require("../img/deadline.png") },
  ],
};

const extractSourceNames = (sourcesObject) => {
  return Object.values(sourcesObject)
    .flat()
    .map((source) => source.name);
};

export default function InterestAndPreferences() {
  const [interests, setInterests] = useState({
    entertainment: { selected: true, level: 5 },
    politics: { selected: true, level: 5 },
    world: { selected: true, level: 5 },
    sports: { selected: true, level: 5 },
  });
  const allSourceNames = extractSourceNames(news_sources);
  const [selectedSource, setSelectedSource] = useState(allSourceNames);
  const navigate = useNavigate();

  const handleInterestChange = (event) => {
    const { name, checked } = event.target;
    setInterests((prev) => ({
      ...prev,
      [name]: { ...prev[name], selected: checked },
    }));
  };

  const handleLevelChange = (name, event, value) => {
    setInterests((prev) => ({
      ...prev,
      [name]: { ...prev[name], level: value },
    }));
  };

  const handleSourceChange = (event, sourceName) => {
    const isChecked = event.target.checked;
    setSelectedSource((prevSelectedSource) => {
      if (isChecked) {
        return [...prevSelectedSource, sourceName];
      } else {
        return prevSelectedSource.filter((item) => item !== sourceName);
      }
    });
  };

  const handlePreferencesSubmit = () => {
    localStorage.setItem(
      "selectedInterests",
      JSON.stringify(Object.keys(interests).filter((key) => interests[key]))
    );
    localStorage.setItem("selectedSources", JSON.stringify(selectedSource));
    navigate("/newsletter"); // Navigate to the newsletter page
  };

  const sources = Object.keys(interests)
    .filter((key) => interests[key])
    .flatMap((key) => news_sources[key] || []);

  return (
    <Box sx={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Customize Your News Feed
      </Typography>
      <Box sx={{ margin: "40px 0" }}>
        {Object.keys(interests).map((interest) => (
          <Box
            key={interest}
            sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={interests[interest].selected}
                  onChange={handleInterestChange}
                  name={interest}
                  icon={<StarBorderIcon />}
                  checkedIcon={<StarIcon />}
                />
              }
              label={interest.charAt(0).toUpperCase() + interest.slice(1)}
              sx={{ marginRight: "20px" }}
            />
            <Slider
              value={interests[interest].level}
              onChange={(event, value) =>
                handleLevelChange(interest, event, value)
              }
              disabled={!interests[interest].selected}
              step={1}
              marks
              min={1}
              max={10}
              valueLabelDisplay="auto"
              sx={{ flexGrow: 1 }}
            />
          </Box>
        ))}
      </Box>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        Select Your News Sources
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {sources.map((source) => (
          <Paper
            key={source.name}
            elevation={selectedSource.includes(source.name) ? 12 : 2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              p: "20px",
              "&:hover": {
                boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
                transform: "scale(1.05)",
              },
              width: "150px",
              minHeight: "100px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={source.logo}
              alt={`${source.name} Logo`}
              style={{ width: "100%", height: "auto" }}
            />
            <Checkbox
              checked={selectedSource.includes(source.name)}
              onChange={(event) => handleSourceChange(event, source.name)}
              sx={{
                position: "absolute",
                top: "5px",
                right: "5px",
                color: "green",
              }}
            />
          </Paper>
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePreferencesSubmit}
        sx={{
          marginTop: "30px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Continue
      </Button>
    </Box>
  );
}
