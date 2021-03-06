import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import client from '../graphql/config';
import store from '../redux/store';
import scTheme from '../theme/sc';
import muiTheme from '../theme/mui';
import GlobalDataProvider from '../global-data-provider';

// Given that we are implementing App Shell Architecture and, therefore,
// injecting (via reactDOM.render) the Header, Menu and Main components into
// different HTML elements, we need a way to share the router 'history' among
// all three mentioned components.
// As a default, for every invocation of 'BrowserRouter', there will be new
// 'history' instance created. Then, changes in the 'history' object in one
// component won't be available in the other components. To prevent this, we are
// relying on 'Router' component instead of 'BrowserRouter' and defining our
// custom 'history' object by means of 'createBrowserHistory' function. Said
// 'history' object is then passed to every invocation of 'Router' and therefore
// the same 'history' object will be shared among all three mentioned components.
const history = createBrowserHistory();

const App = ({ component }) => (
  <ThemeProvider theme={scTheme}>
    <Router history={history}>
      <ReduxProvider store={store}>
        <ApolloProvider client={client}>
          <MuiThemeProvider theme={muiTheme}>
            <GlobalDataProvider>
              {globalDataProps => (
                React.createElement(component, { ...globalDataProps })
              )}
            </GlobalDataProvider>
          </MuiThemeProvider>
        </ApolloProvider>
      </ReduxProvider>
    </Router>
  </ThemeProvider>
);

App.propTypes = {
  component: PropTypes.func.isRequired,
};

export default App;
