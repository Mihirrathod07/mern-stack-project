import React from "react";
import "./AboutSection.css";
import { Button, Typography } from "@material-ui/core";
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import logo from "../../../images/glossy.png";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/tryglowssy/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
          <img src={logo} alt="glossy" style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }} />
            <Typography>Glossy</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a wesbite made by Glossy Devlopers.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/@tryglowssy"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.instagram.com/tryglowssy/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;