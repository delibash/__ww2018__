import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Redirect,
} from 'react-router-dom';
import HomeRoute from './HomeRoute';
import { LogIn } from './../containers/';

const AuthRequiredRoute = ({ isAuthenticated, component: Component, ...props }) => {
  return (
    <Route {...props} render={props => (
      isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/login'
        }} />
    )} />
  );
};

const Router = ({ isAuthenticated, ...props }) => {
  return (
    <BrowserRouter>
      <>
        <AuthRequiredRoute
          isAuthenticated={isAuthenticated}
          component={HomeRoute}
          {...props}
        />
        <Route path="/login" component={LogIn} />
      </>
    </BrowserRouter>
  );
};

Router.propTypes = {
  isAuthenticated: PropTypes.bool
};

AuthRequiredRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  component: PropTypes.func
};

export default connect(
  () => ({ isAuthenticated: true }),
  {}
)(Router);