import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="d-flex flex-column bg-dark text-white footer">
      <div className="d-flex flex-wrap justify-content-center align-items-start px-5 py-4 footer-widgets">
        <img
          className="d-block mr-auto"
          src="/images/logo.png"
          alt="red-onion-logo"
        />
        <div>
          <Link to="/about">About Red Onion</Link>
          <Link to="/blog">Red Onion Blog</Link>
          <Link to="/login">Sign Up to Order</Link>
          <Link to="/add-restaurant">Add Your Restaurant</Link>
        </div>
        <div>
          <Link to="/help">Get Help</Link>
          <Link to="/faq">Read FAQs</Link>
          <Link to="/restaurants">Red Onion Restaurants</Link>
          <Link to="/restaurants-near-you">Restaurants Near You</Link>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-center align-items-center px-5 py-2 footer-menu">
        <p className="text-secondary">
          Copyright © RED ONION All Rights Reserved
        </p>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms">Terms of Use</Link>
        <Link to="/pricing">Pricing</Link>
      </div>
    </div>
  );
}
