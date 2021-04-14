import React, { useContext, useState } from "react";
import "./SignUp.scss";
import { Link, useHistory } from "react-router-dom";
import {
  handleAccountCreation,
  handleGoogleSignIn,
  initFirebase,
} from "../../Data/fireAuth";
import { UserContext } from "../../App";
import { addLoggedInUser } from "../../Data/dbManager";

export default function SignUp() {
  initFirebase();

  const [gSignError, setGSignError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [passwordConfirmationError, setPasswordConfirmationError] = useState();
  const [accountCreationError, setAccountCreationError] = useState();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();

  const signInWithGoogle = (e) => {
    e.preventDefault();
    handleGoogleSignIn().then((res) => {
      if (res.isSignedIn) {
        setLoggedInUser(res);
        addLoggedInUser(res);
        history.replace("/");
      } else {
        setGSignError(res.message);
      }
    });
  };

  const createAccount = (e) => {
    e.preventDefault();
    const name = e.target.querySelector("input#name").value;
    const email = e.target.querySelector("input#email").value;
    const password = e.target.querySelector("input#password").value;
    const passwordConfirmation = e.target.querySelector(
      "input#confirm-password"
    ).value;
    setPasswordError(null);
    setPasswordConfirmationError(null);
    setAccountCreationError(null);
    if (name && email && passwordConfirmation && passwordConfirmation) {
      if (
        password.length < 8 ||
        password === name ||
        password === email ||
        passwordConfirmation !== password
      ) {
        if (password.length < 8) {
          setPasswordError("Password must contain more than 8 characters");
        }
        if (password === name || password === email) {
          setPasswordError("Email or Username can't be used as Password");
        }
        if (passwordConfirmation !== password) {
          setPasswordConfirmationError(
            "Passwords don't match, please retype the correct password"
          );
        }
      } else {
        handleAccountCreation(email, password, name).then((res) => {
          !res
            ? history.replace("/login")
            : setAccountCreationError(res.message);
        });
      }
    }
  };

  return (
    <div className="signup d-flex justify-content-center align-items-center">
      <form
        onSubmit={createAccount}
        className="d-flex flex-column signup-form p-3 m-5 text-center rounded"
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
          className="form-control p-2 mb-3"
          type="text"
          name="name"
          id="name"
          placeholder="Enter Your Name"
          required
        />
        <input
          className="form-control p-2 my-3"
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email Address"
          required
        />
        <input
          className="form-control p-2 my-3"
          type="password"
          name="password"
          id="password"
          placeholder="Type a Strong Password"
          required
        />

        {passwordError && (
          <span className="text-center text-danger">
            <b>{passwordError}</b>
          </span>
        )}

        <input
          className="form-control p-2 my-3"
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder="Confirm Password"
          required
        />

        {passwordConfirmationError && (
          <span className="text-center text-danger">
            <b>{passwordConfirmationError}</b>
          </span>
        )}

        <button type="submit" className="my-3 btn-brand">
          Create an Account
        </button>

        {accountCreationError && (
          <span className="text-center text-danger">
            <b>{accountCreationError}</b>
          </span>
        )}

        <Link className="mt-2" to="/login">
          Already have an account
        </Link>
      </form>
    </div>
  );
}
