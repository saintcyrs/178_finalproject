import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  IconButton,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from 'axios'; // Make sure to import axios

export default function NewsCard({
  title,
  summary,
  source,
  sourceUrl,
  imageUrl,
  articleId, // Make sure articleId is passed as a prop
}) {
  const [vote, setVote] = useState(null);


  return (
    <Card raised elevation={3} style={{ margin: 8 }}>
      <CardActionArea
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt="News image"
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {title || "No Title Available"}
          </Typography>
          {summary ? (
            <Typography color="textSecondary">{summary}</Typography>
          ) : (
            <Typography color="textSecondary">No summary available.</Typography>
          )}
          <br></br>
          <Typography variant="body2" color="black">
            {source || "Read More"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton
          onClick={handleUpvote}
          aria-label="upvote"
          sx={{ color: vote === true ? "green" : "grey" }}
        >
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton
          onClick={handleDownvote}
          aria-label="downvote"
          sx={{ color: vote === false ? "red" : "grey" }}
        >
          <ArrowDownwardIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
