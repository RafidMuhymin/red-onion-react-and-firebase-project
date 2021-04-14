import React from "react";
import Menu from "./Menu/Menu";
import Intro from "./Intro/Intro";
import Testimonial from "./Testimonial/Testimonial";

export default function Home({ cart, setCart }) {
  return (
    <div>
      <Intro></Intro>
      <Menu cart={cart} setCart={setCart}></Menu>
      <Testimonial></Testimonial>
    </div>
  );
}
