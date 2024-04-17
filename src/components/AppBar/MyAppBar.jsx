import * as React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function MyAppBar() {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          dsptch
        </Typography>
        <Button
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
