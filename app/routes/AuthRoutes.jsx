import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/LoginPage';
import InitialLoginPage from '../pages/InitialLoginPage';

const ContainerRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);

class AuthRoute extends React.Component {
  render() {
    return (
      <AuthLayout>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <ContainerRoute path="/auth/login" component={LoginPage} />
          <ContainerRoute path="/auth/initial-login" component={InitialLoginPage} />
          <Redirect from="*" to="/not-found" />
        </Switch>
      </AuthLayout>
    );
  }
}

export default AuthRoute;
