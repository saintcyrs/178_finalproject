import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

export default function NewsCard({ title, summary, source }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography color="textSecondary">{summary}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{source}</Button>
      </CardActions>
    </Card>
  );
}
