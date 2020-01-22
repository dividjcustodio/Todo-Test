import { Route, Redirect } from "react-router-dom";
import React from "react";

function PublicRoute({ component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        rest.isAuthenticated ? (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        ) : (
          React.createElement(component, props)
        )
      }
    />
  );
}

export default PublicRoute;
