import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

export default function NewsCard({
  title,
  summary,
  source,
  sourceUrl,
  imageUrl,
}) {
  return (
    <Card raised elevation={3} style={{ margin: 10 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt="News image"
      />
      <CardContent>
        {/* Display title only if it's provided, otherwise show a default message */}
        <Typography variant="h5" component="h2">
          {title || "No Title Available"}
        </Typography>
        {/* Conditional rendering to check for summary content */}
        {summary ? (
          <Typography color="textSecondary">{summary}</Typography>
        ) : (
          <Typography color="textSecondary">No summary available.</Typography>
        )}
      </CardContent>
      <CardActions>
        {/* Render the button only if a sourceUrl is provided */}
        {sourceUrl && (
          <Button
            size="small"
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {source || "Read More"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
