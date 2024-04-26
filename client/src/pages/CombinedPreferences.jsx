import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox, FormControlLabel, Button, Typography, Box } from '@mui/material';
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
    entertainment: true,
    politics: true,
    world: true,
    sports: true, // Assuming you want to include sports, though it's not defined in the news_sources
  });
  const allSourceNames = extractSourceNames(news_sources);
  const [selectedSource, setSelectedSource] = useState(allSourceNames);
  const navigate = useNavigate();

  const handleInterestChange = (event) => {
    const { name, checked } = event.target;
    setInterests(prev => ({ ...prev, [name]: checked }));
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
          <FormControlLabel
            control={
              <Checkbox
                checked={interests[interest]}
                onChange={handleInterestChange}
                name={interest}
              />
            }
            label={interest.charAt(0).toUpperCase() + interest.slice(1)}
            key={interest}
          />
        ))}
      </Box>
        <Box className="news-sources">
        {sources.map((source) => (
            <Box
            key={source.name}
            className="news-source"
            sx={{
                display: 'flex',
                flexDirection: 'column', // Set direction to column to stack image/text and checkbox
                justifyContent: 'space-between', // Space between content and checkbox
                alignItems: 'flex-start', // Align items to the start
                border: selectedSource.includes(source.name) ? '2px solid green' : '1px solid grey',
                padding: '10px',
                margin: '10px',
                width: '150px', // Example width, adjust as needed
                height: '75px', // Example height, adjust as needed
                position: 'relative', // Needed for absolute positioning of the checkbox
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
        sx={{ marginTop: '20px' }}
      >
        Continue
      </Button>
    </Box>
  );
}
