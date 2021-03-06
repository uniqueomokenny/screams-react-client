import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';

import { Provider } from 'react-redux';

import HomePage from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import Navbar from './components/layout/Navbar';

import themeFile from './util/theme';
import AuthRoute from './util/AuthRoute';
import store from './redux/store';
import { logoutUser, getUserData } from './redux/actions/userActions';
import { SET_AUTHENTICATED } from './redux/types';
import axios from 'axios';
import User from './pages/user';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL =
  'https://europe-west1-socialapp-47d2b.cloudfunctions.net/api';

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <AuthRoute exact path='/login' component={Login} />
              <AuthRoute exact path='/signup' component={SignUp} />
              <Route exact path='/users/:handle' component={User} />
              <Route
                exact
                path='/users/:handle/scream/:screamId'
                component={User}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
