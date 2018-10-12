import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import userFragment from './graphql/user/fragment/user';
import { ScrollToTop, RouteWithProps, LoggedInRoute } from './components/route-wrappers';
import AuthPage from './pages/auth-page';
import HomePage from './pages/home-page';
import SettingsPage from './pages/settings-page';
import ConsolePage from './pages/console-page';
import NotFoundPage from './pages/not-found-page';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Routes = props => (
  <ScrollToTop>
    <Switch>
      {/* HOME */}
      <LoggedInRoute
        exact
        path="/"
        component={HomePage}
        overlay={AuthPage}
        {...props}
      />
      {/* SETTINGS */}
      <LoggedInRoute
        exact
        path="/settings"
        component={SettingsPage}
        overlay={AuthPage}
        {...props}
      />
      {/* CONSOLE */}
      <LoggedInRoute
        exact
        path="/console"
        component={ConsolePage}
        overlay={AuthPage}
        {...props}
      />
      {/* <RouteWithProps
        exact
        path="/"
        component={HomePage}
        {...props}
      /> */}
      {/* NOT FOUND */}
      <Route
        component={NotFoundPage}
      />
    </Switch>
  </ScrollToTop>
);

Routes.propTypes = {
  curUser: propType(userFragment), // eslint-disable-line
};

Routes.defaultProps = {
  curUser: null,
};

export default Routes;
