import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'

import loggedIn from "../auth/loggedIn";
import Login from '../pages/authentication/Login';


const Routes = () => {
    if(loggedIn()){
        return (
            <Switch>
                <Route path='/dashboard' exact component={Dashboard}/>
                <Route path='/customers' component={Customers}/>
            </Switch>
        )
    }

    return <Login />
}

export default Routes
