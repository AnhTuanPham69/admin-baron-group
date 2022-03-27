import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Tutors from "../pages/Tutors";

const Routes = () => {
  return (
    <Switch>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/customers" component={Customers} />
      <Route path="/tutors" component={Tutors} />
    </Switch>
  );
};

export default Routes;
