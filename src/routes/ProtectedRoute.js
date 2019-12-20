/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../actions/auth';

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        }
        return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
        );
      }}
    />
);
