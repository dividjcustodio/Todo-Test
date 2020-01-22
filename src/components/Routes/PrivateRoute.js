import { Route, Redirect } from "react-router-dom";
import React from "react";

function PrivateRoute({ component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        rest.isAuthenticated ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location
              }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
