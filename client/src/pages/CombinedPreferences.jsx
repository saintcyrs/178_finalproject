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
    const selectedInterestsAndLevels = Object.entries(interests)
    .filter(([key, value]) => value.selected)
    .reduce((acc, [key, value]) => {
      acc[key] = value.level;
      return acc;
    }, {});

  localStorage.setItem('selectedInterests', JSON.stringify(Object.keys(selectedInterestsAndLevels)));
  localStorage.setItem('interestLevels', JSON.stringify(selectedInterestsAndLevels)); // Save the levels
  localStorage.setItem('selectedSources', JSON.stringify(selectedSource.map(source => source.name)));

  navigate('/newsletter');
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
      <Box className="news-sources">
        {sources.map((source) => (
          <Box
            key={source.name}
            className="news-source"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                border: selectedSource.includes(source.name) ? '2px solid green' : '1px solid grey',
                padding: '10px',
                margin: '10px',
                width: '150px',
                height: '75px',
                position: 'relative',
            }}
            >
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <img src={source.logo} alt={`${source.name} Logo`} style={{ width: '50px', height: 'auto' }} />
                <Typography sx={{ marginLeft: '10px', flexGrow: 1 }}>{source.name}</Typography>
            </Box>
            <Checkbox
                checked={selectedSource.includes(source.name)}
                onChange={(event) => handleSourceChange(event, source.name)}
                sx={{ position: 'absolute', bottom: '5px', right: '5px' }} // Positioning the checkbox
            />
            </Box>
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePreferencesSubmit}
        sx={{ marginTop: '30px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
      >
        Continue
      </Button>
    </Box>
  );
}