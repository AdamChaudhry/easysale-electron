import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/LoginPage';
import InitialLoginPage from '../pages/InitialLoginPage';

const ContainerRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);

class AuthRoute extends React.Component {
  render() {
    const { user, token } = this.props;
    if (user && token) {
      return <Redirect to='/dashboard'/>
    }

    // if (user) {
    //   return <Redirect to='/auth/login'/>;
    // }

    return (
      <AuthLayout>
        <Switch>
          <ContainerRoute path="/auth/login" component={LoginPage} />
          <ContainerRoute path="/auth/initial-login" component={InitialLoginPage} />
          <Redirect from="*" to="/not-found" />
        </Switch>
      </AuthLayout>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth });
export default connect(mapStateToProps, null)(AuthRoute);
