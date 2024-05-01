import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#19857b",
    },
  },
});

/*The signUpForm function allows for the user to input their information and navigates to the next page 
actions related to the user concept */

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
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    navigate("/interests");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container component="main" maxWidth="md">
          <Paper
            elevation={6}
            style={{
              padding: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
            }}
          >
            {" "}
            {/* Semi-transparent background */}
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              style={{
                fontWeight: 600,
                marginBottom: "20px",
                fontFamily: "Helvetica",
                color: "#1976d2",
                textAlign: "center",
              }}
            >
              up2date
            </Typography>
            <Typography
              style={{
                fontSize: "20px",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              Stay up2date with a customizable news feed.
            {/*The code below shows the UI instantiation of the user concept which takes the name, email, and password inputs. */}
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
                disabled={loading}
                sx={{
                  marginTop: "30px",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  backgroundColor: "#1976d2",
                }}
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
