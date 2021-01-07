import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import GuestRoute from './components/GuestRoute';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NewPostPage from './pages/NewPostPage';

const Router = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/post/:slug" component={PostPage} />
    <GuestRoute exact path="/register" component={RegisterPage} />
    <GuestRoute path="/login/:registered?" component={LoginPage} />
    <AdminRoute exact path="/new" component={NewPostPage} />
  </Switch>
);

export default Router;
