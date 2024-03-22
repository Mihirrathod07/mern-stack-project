import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter-1">
        <h1>GLOSSY.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2024 &copy; Glossy</p>
      </div>

      <div className="midFooter-2">
        <h1>CATEGORIES</h1>
        <ul>
          <li><Link to={"/products"}> Eyes</Link></li>
          <li><Link to={"/products"}>Face </Link></li>
          <li><Link to={"/products"}>lips </Link></li>
          <li><Link to={"/products"}>Hair </Link></li>
          <li><Link to={"/products"}>Men </Link></li>
          <li><Link to={"/products"}>Nail </Link></li>
        </ul>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/tryglowssy/">Instagram</a>
        <a href="https://www.youtube.com/@tryglowssy">Youtube</a>
        {/* <a href="http://instagram.com/mihir_rathod_07_">Facebook</a> */}
      </div>
    </footer>
  );
};

export default Footer;
