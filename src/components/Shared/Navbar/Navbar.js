import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import { addLoggedInUser } from "../../../Data/dbManager";
import { handleSignOut, initFirebase } from "../../../Data/fireAuth";
import "./Navbar.scss";

export default function Navbar({ cart }) {
  initFirebase();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [orderCount, setOrderCount] = useState(0);
  useEffect(() => {
    const newOrderCount = cart.reduce((sum, pd) => sum + pd.quantity, 0);
    setOrderCount(newOrderCount);
  }, [cart]);

  const handleToggle = () => {
    const menuItems = document.querySelectorAll(".navbar a:not(.logo)");
    Array.prototype.map.call(menuItems, (mI) => {
      if (mI.style.display === "none") {
        mI.style.display = "block";
        mI.style.width = "100%";
      } else {
        mI.style.display = "none";
        mI.style.width = "auto";
      }
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      if (res) {
        window.location.reload();
      } else {
        const signedOutLoggedInUser = { ...loggedInUser };
        signedOutLoggedInUser.isSignedIn = false;
        setLoggedInUser(signedOutLoggedInUser);
        addLoggedInUser(signedOutLoggedInUser);
        window.location.reload();
      }
    });
  };

  window.addEventListener("resize", () => {
    const menuItems = document.querySelectorAll(".navbar a:not(.logo)");
    if (window.innerWidth > 768) {
      Array.prototype.map.call(menuItems, (mI) => {
        mI.style.display = "block";
        mI.style.width = "auto";
      });
    } else {
      Array.prototype.map.call(menuItems, (mI) => {
        mI.style.display = "none";
      });
    }
  });

  return (
    <nav className="navbar">
      <Link className="logo" to="/">
        <img src={`/images/logo.png`} alt="red-onion-logo" />
      </Link>
      <button id="toggler" onClick={handleToggle}>
        <i className="lni lni-menu"></i>
      </button>
      <Link to="/home">Home</Link>
      <Link to="/cart">
        <i className="lni lni-cart"></i>
        {orderCount > 0 && <span>{orderCount}</span>}
      </Link>
      {loggedInUser.isSignedIn ? (
        <span className="d-flex">
          <Link to="/profile">Profile</Link>
          <button onClick={signOut} className="btn" id="sign-out">
            Sign Out
          </button>
        </span>
      ) : (
        <span className="d-flex">
          <Link to="/login">Login</Link>
          <Link className="red-button" to="/sign-up">
            Sign Up
          </Link>
        </span>
      )}
    </nav>
  );
}
