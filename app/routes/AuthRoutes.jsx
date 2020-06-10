import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import * as actions from '../actions/auth';
import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/LoginPage';
import InitialLoginPage from '../pages/InitialLoginPage';

const ContainerRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);

class AuthRoute extends React.Component {
  componentDidMount() {
    const { token, user, authenticateUser } = this.props;
    if (token && user) {
      authenticateUser();
    }
  }

  render() {
    const { loading, user, token } = this.props;

    if (loading) {
      return (<Spin tip="Loading..." spinning={true} style={{'marginTop': '20%'}}> </Spin>);
    }

    if (user && Object.keys(user).length && token) {
      return <Redirect to='/dashboard'/>
    }

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
export default connect(mapStateToProps, actions)(AuthRoute);
