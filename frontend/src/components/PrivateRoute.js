import React from "react";
import { Route, Redirect } from "react-router-dom";

import currentUserValue from "./services/currentUserValue";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      //   const currentUser = currentUserValue;

      localStorage.getItem("currentUser") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
export default PrivateRoute;
