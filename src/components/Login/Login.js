import React, { useContext, useState } from "react";
import {
  handleAccountSignIn,
  handleGoogleSignIn,
  initFirebase,
} from "../../Data/fireAuth";
import "./Login.scss";
import { UserContext } from "../../App";
import "firebase/auth";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { addLoggedInUser } from "../../Data/dbManager";

export default function Login() {
  initFirebase();

  const [gSignError, setGSignError] = useState();
  const [emailSignError, setEmailSignError] = useState();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const signInWithGoogle = (e) => {
    e.preventDefault();
    setGSignError();
    handleGoogleSignIn().then((res) => {
      if (res.isSignedIn) {
        if (loggedInUser.email === res.emali) {
          const loggedInUserInfo = { ...loggedInUser, ...res };
          setLoggedInUser(loggedInUserInfo);
          addLoggedInUser(loggedInUserInfo);
        } else {
          setLoggedInUser(res);
          addLoggedInUser(res);
        }
        history.replace(from);
      } else {
        setGSignError(res.message);
      }
    });
  };

  const signInWithEmailAndPassword = (e) => {
    e.preventDefault();
    setEmailSignError();

    const email = e.target.querySelector("input#email").value;
    const password = e.target.querySelector("input#password").value;

    handleAccountSignIn(email, password).then((res) => {
      if (res.isSignedIn) {
        if (loggedInUser.email === res.emali) {
          const loggedInUserInfo = { ...loggedInUser, ...res };
          setLoggedInUser(loggedInUserInfo);
          addLoggedInUser(loggedInUserInfo);
        } else {
          setLoggedInUser(res);
          addLoggedInUser(res);
        }
        history.replace(from);
      } else {
        setEmailSignError(res.message);
      }
    });
  };

  console.log(UserContext);

  return (
    <div className="login d-flex justify-content-center align-items-center">
      <form
        onSubmit={signInWithEmailAndPassword}
        className="d-flex flex-column login-form p-3 m-5 text-center rounded"
      >
        <img className="w-50 mx-auto my-4" src="./images/logo.png" alt="" />

        <button onClick={signInWithGoogle} className="btn btn-primary">
          Sign in With Google
        </button>

        {gSignError && (
          <span className="text-center text-danger">
            <b>{gSignError}</b>
          </span>
        )}

        <p className="or">
          <span>Or</span>
        </p>
        <input
          className="form-control mb-3 p-2"
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email Address"
          required
        />
        <input
          className="form-control my-3 p-2"
          type="password"
          name="password"
          id="password"
          placeholder="Enter Your Password"
          required
        />
        <button className="my-3 btn-brand" type="submit">
          Sign in
        </button>

        {emailSignError && (
          <span className="text-center text-danger">
            <b>{emailSignError}</b>
          </span>
        )}
        <Link className="mt-2" to="/sign-up">
          Don't have an account
        </Link>
      </form>
    </div>
  );
}
