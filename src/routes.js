import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Collection from './components/Collection/Collection';

export default(
    <Switch>
        <Route path ='/dashboard' component={Dashboard} />
        <Route path ='/collection' component={Collection} />
        <Route path='/profile' component={Profile} />
        <Route path='/' component={Home} />
    </Switch>
)