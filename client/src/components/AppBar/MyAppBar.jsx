import * as React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MyAppBar() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate("/");
  };
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          up2date
        </Typography>
        <Button
          onClick={handleSignOut}
          color="primary"
          variant="outlined"
          style={{ marginLeft: "auto" }}
        >
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
}
