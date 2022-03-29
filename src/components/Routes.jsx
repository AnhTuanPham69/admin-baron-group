import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Tutors from "../pages/Tutors";
import ChangePassword from "../pages/ChangePassword";

const Routes = () => {
  return (
    <Switch>
      <Route path="/settings " component={Customers} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/customers" component={Customers} />
      <Route path="/tutors" component={Tutors} />
      <Route path="/change_password" component={ChangePassword} />
    </Switch>
  );
};

export default Routes;
