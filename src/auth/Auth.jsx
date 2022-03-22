import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

import Layout from "../components/layout/Layout";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import Login from "../pages/authentication/Login";
import loggedIn from "./loggedIn";

const Auth = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {loggedIn()
          ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/dashboard" component={Layout} />
        <Route path="/forgot_password" component={ForgotPassword} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Auth;
