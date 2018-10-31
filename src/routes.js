import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';

export default(
    <Switch>
        <Route path ='/dashboard' component={Dashboard} />
        <Route path='/profile' component={Profile} />
        <Route path='/' component={Home} />
    </Switch>
)