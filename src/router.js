import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Note from './pages/Note';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}></Route>
                <Route path="/note" component={Note}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/forgot_password" component={ForgotPassword}></Route>
            </Switch>
        </BrowserRouter>
    )
}