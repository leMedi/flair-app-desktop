/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import DashboardLayout from './layouts/DashboardLayout';
import UserLayout from './layouts/UserLayout';
// import LoginPage from './containers/Login/LoginPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.LOGIN} component={UserLayout} />
      <Route path={routes.HOME} component={DashboardLayout} />
    </Switch>
  </App>
);
