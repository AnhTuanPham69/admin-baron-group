import React from 'react'

import { Route, Switch } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min'

import Layout from '../components/layout/Layout'
import ForgotPassword from '../pages/authentication/ForgotPassword'
import Login from '../pages/authentication/Login'

const Auth = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Layout}/>
            <Route path='/forgot_password' component={ForgotPassword}/>
            <Route path='/login' component={Login}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Auth