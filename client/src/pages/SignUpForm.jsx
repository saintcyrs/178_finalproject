import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Paper, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import newspaperImage from '../img/newspaper4.jpg';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
  },
});

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
    console.log("userInfo", userInfo);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    navigate("/interests");
  };
 
 /* return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" style={{ paddingTop: '10vh' }}>
        <Typography variant="h3" component="h1" gutterBottom style={{ fontWeight: 600, marginBottom: '20px' }}>
          Up2Date
        </Typography>
        <Paper elevation={6} style={{ padding: '20px' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
              fullWidth
              style={{ marginTop: '20px' }}
            >
              {loading ? "Signing Up..." : "Continue"}
            </Button>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
*/


return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <div style={{
      height: '100vh',
      backgroundImage: `url(${newspaperImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={6} style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.85)' }}> {/* Semi-transparent background */}
          <Typography variant="h3" component="h1" gutterBottom style={{ fontWeight: 600, marginBottom: '20px' }}>
            up2date
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
              fullWidth
              style={{ marginTop: '20px' }}
            >
              {loading ? "Signing Up..." : "Continue"}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  </ThemeProvider>
);
}