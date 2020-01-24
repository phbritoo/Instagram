import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from '../assets/instagram.svg';
import camera from '../assets/camera.svg';

export default function Header() {
  return (
    //header#main-header
    <header id="main-header">
      <div className="header-content">
        <Link to="/">
          <img src={logo} alt="InstaRocket"></img>
        </Link>
        <Link to="/new">
          <img src={camera} alt="EnviarPublicação"></img>
        </Link>
      </div>
    </header>
  );
}
