import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel, Button, Typography } from "@mui/material";

export default function InterestForm() {
  const [interests, setInterests] = useState({
    entertainment: false,
    politics: false,
    world: false,
    sports: false,
  });

  const navigate = useNavigate();

  const handleInterestChange = (event) => {
    const { value, checked } = event.target;
    setInterests({
      ...interests,
      [value]: checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Variable which extracts keys from interests object
    const interestKeys = Object.keys(interests).filter(
      (interest) => interests[interest]
    );
    console.log("Interests selected:", interestKeys);
    localStorage.setItem("selectedInterests", JSON.stringify(interestKeys));
    //right now navigate to preferences page
    navigate("/preferences");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">What are you interested in?</Typography>
      {Object.keys(interests).map((interest) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={interests[interest]}
              onChange={handleInterestChange}
              name="interests"
              value={interest}
            />
          }
          label={interest.charAt(0).toUpperCase() + interest.slice(1)}
          key={interest}
        />
      ))}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}
