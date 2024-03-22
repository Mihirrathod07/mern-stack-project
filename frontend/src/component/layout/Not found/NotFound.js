import React from "react";
import ErrorIcon from '@mui/icons-material/Error';
import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon />

      <Typography>The page you are looking for does not exist.</Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;