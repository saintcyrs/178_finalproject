import * as React from "react";
import { useLocation } from 'react-router-dom';
import './Preferences.css';

const sources = {
    politics: [
        { name: 'CNN', logo: '/img/cnn.png' },
        { name: 'Fox', logo: '/img/fox.png' },
        { name: 'BBC', logo: '/img/bbc.png' },
      ],
      entertainment: [
        { name: 'Variety', logo: '/img/variety.png' },
        { name: 'The Hollywood Reporter', logo: '/img/hollywood.png' },
        { name: 'Deadline', logo: '/img/deadline.png' },
      ]
  };

export default function Preferences() {
    const location = useLocation();
    
    const selectedTopic = location.state?.selectedTopic || '';
    const sources = NEWS_SOURCES[selectedTopic] || [];
  
    const handleNewsSourceClick = (source) => {
        console.log('News source clicked:', source);
    };

    return (
        <div className="preferences-container">
        <h1>Hone your preferences:</h1>
        <div className="selected-topic">
          {selectedTopic && <h2>{selectedTopic}</h2>}
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Type or select a news source URL" />
        </div>
        <div className="news-sources">
          {sources.map((source) => (
            <div key={source.name} className="news-source" onClick={() => handleNewsSourceClick(source.name)}>
              <img src={source.logo} alt={`${source.name} Logo`} className="news-source-logo" />
              <p>{source.name}</p>
            </div>
          ))}
        </div>
        </div>
    );
}
