import React from "react";
import "./Intro.scss";

export default function Intro() {
  return (
    <div
      style={{ backgroundImage: "url('/images/bannerbackground.png')" }}
      className="intro"
    >
      <div>
        <h1>Best Food Waiting For Your Belly</h1>
        <div>
          <input
            type="text"
            name="foodName"
            placeholder="Search Your Favorite Food"
            id="foodName"
            className="form-control"
          />
          <input type="button" value="Search" id="search" className="btn" />
        </div>
      </div>
    </div>
  );
}
