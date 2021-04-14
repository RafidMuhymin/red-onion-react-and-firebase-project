import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../App";

export function PrivateRoute({ children, ...rest }) {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.isSignedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/SignIn",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
