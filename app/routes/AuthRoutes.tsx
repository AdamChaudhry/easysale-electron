import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/LoginPage';

const ContainerRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);

class AuthRoute extends React.Component {
  render() {
    console.log(
      '...........................',
      'in auth routes',
      window.location.href
    );
    return (
      <AuthLayout>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <ContainerRoute path="/auth/login" component={LoginPage} />
          <Redirect from="*" to="/not-found" />
        </Switch>
      </AuthLayout>
    );
  }
}

export default AuthRoute;
