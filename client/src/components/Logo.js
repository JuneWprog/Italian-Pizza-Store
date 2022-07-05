/**
 * logo component 
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";


export default function Logo() {
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo} className="app-logo" alt="logo"></img>
      </Link>
    </div>
  );
}
