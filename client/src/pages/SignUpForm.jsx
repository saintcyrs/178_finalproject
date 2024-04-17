import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";

export default function SignUpForm() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate("/interests");
    // setLoading(true);
    // setError(null);

    // try {
    //   const response = await fetch('/api/register', { // API endpoint
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(userInfo),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`Error: ${response.statusText}`);
    //   }

    //   const data = await response.json();
    //   console.log('Registration successful:', data);
    //   navigate('/interests');

    //   // Handle success (e.g., store token, navigate, show message)

    // } catch (error) {
    //   console.error('Registration failed:', error);
    //   setError(error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Set up your dsptch:</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="First Name"
        variant="outlined"
        name="firstName"
        value={userInfo.firstName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        variant="outlined"
        name="email"
        value={userInfo.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        name="password"
        value={userInfo.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Continue"}
      </Button>
    </form>
  );
}
