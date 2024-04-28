import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox, FormControlLabel, Button, Typography, Box, Slider} from '@mui/material';
import './Preferences.css'; // Make sure this CSS file contains all the styles needed for both interests and preferences

const news_sources = {
  politics: [
    { name: "BBC News", logo: require("../img/bbc.png") },
    { name: "CNN", logo: require("../img/cnn.png") },
    { name: "Fox News", logo: require("../img/fox.png") },
  ],
  entertainment: [
    { name: "Variety", logo: require("../img/variety.png") },
    { name: "The Hollywood Reporter", logo: require("../img/hollywood.png") },
    { name: "Deadline", logo: require("../img/deadline.png") },
  ],
  world: [
    { name: "New York Times", logo: require("../img/nyt.png") },
    { name: "Wall Street Journal", logo: require("../img/wsj.png") },
  ]
};

const extractSourceNames = (sourcesObject) => {
  return Object.values(sourcesObject).flat().map((source) => source.name);
};

export default function InterestAndPreferences() {
  const [interests, setInterests] = useState({
    entertainment: { selected: true, level: 5 },
    politics: { selected: true, level: 5 },
    world: { selected: true, level: 5 },
    sports: { selected: true, level: 5 } 
  });
  const allSourceNames = extractSourceNames(news_sources);
  const [selectedSource, setSelectedSource] = useState(allSourceNames);
  const navigate = useNavigate();

  const handleInterestChange = (event) => {
    const { name, checked } = event.target;
    setInterests(prev => ({ ...prev, [name]: { ...prev[name], selected: checked } }));
  };
  
  const handleLevelChange = (name, event, value) => {
    setInterests(prev => ({ ...prev, [name]: { ...prev[name], level: value } }));
  };

  const handleSourceChange = (event, sourceName) => {
    const isChecked = event.target.checked;
    setSelectedSource(prevSelectedSource => {
      if (isChecked) {
        return [...prevSelectedSource, sourceName];
      } else {
        return prevSelectedSource.filter(item => item !== sourceName);
      }
    });
  };

  const handlePreferencesSubmit = () => {
    localStorage.setItem('selectedInterests', JSON.stringify(Object.keys(interests).filter(key => interests[key])));
    localStorage.setItem('selectedSources', JSON.stringify(selectedSource));
    navigate('/newsletter'); // Navigate to the newsletter page
  };

  const sources = Object.keys(interests).filter(key => interests[key]).flatMap(key => news_sources[key] || []);

  return (
    <Box>
      <Typography variant="h6">What are you interested in?</Typography>
      <Box>
        {Object.keys(interests).map((interest) => (
          <Box key={interest} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={interests[interest].selected}
                  onChange={handleInterestChange}
                  name={interest}
                />
              }
              label={interest.charAt(0).toUpperCase() + interest.slice(1)}
            />
            <Slider
              value={interests[interest].level}
              onChange={(event, value) => handleLevelChange(interest, event, value)}
              disabled={!interests[interest].selected}
              step={1}
              marks
              min={1}
              max={10}
              valueLabelDisplay="auto"
              sx={{ marginLeft: '20px', width: '200px' }}
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