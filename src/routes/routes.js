/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../containers/Login';
import Signup from '../containers/Signup';


const BaseRouter = (props) => {
  const { logout } = props;
  return (
        <div>
            <Route exact path="/" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
        </div>
  );
};

export default BaseRouter;
