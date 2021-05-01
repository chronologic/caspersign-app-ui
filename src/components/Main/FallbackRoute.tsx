/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function FallbackRoute({ ...rest }) {
  return (
    <Route
      path="*"
      {...rest}
      render={({ location }) => (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location },
          }}
        />
      )}
    />
  );
}
