/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuthContext } from "../../hooks";

interface IProps {
  children: React.ReactNode;
  exact?: boolean;
  path?: string;
}

export default function PrivateRoute({ children, ...rest }: IProps) {
  const { isAuthenticated } = useAuthContext();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
