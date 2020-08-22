import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import * as actions from '../actions/auth';
import AppLayout from '../layouts/AppLayout';
import DashboardPage from '../pages/DashboardPage';
import ProductPage from '../pages/ProductPage';
import ImportProductPage from '../pages/ImportProduct';
import CategoryPage from '../pages/CategoryPage';
import ManufacturerPage from '../pages/ManufacturerPage';
import SalePage from '../pages/SalePage';
import PosPage from '../pages/PosPage';


const ContainerRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => <Component {...props} />} />
);

class AppRoute extends Component {
  componentDidMount() {
    const { token, authenticateUser } = this.props;
    if (token) {
      authenticateUser();
    }
  }

  render() {
    const { loading, token, user } = this.props;
    if (loading) {
      return (<Spin tip="Loading..." spinning={true} style={{'marginTop': '20%'}}> </Spin>);
    }

    if (user && Object.keys(user).length && !token) {
      return <Redirect to='/auth/login'/>
    }

    if (!token) {
      return <Redirect to='/auth/initial-login'/>
    }


    return (
      <AppLayout>
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <ContainerRoute path="/dashboard" component={DashboardPage} />
          <ContainerRoute path="/pos" component={PosPage} />
          <ContainerRoute path="/product" component={ProductPage} />
          <ContainerRoute path="/import-product" component={ImportProductPage} />
          <ContainerRoute path="/category" component={CategoryPage} />
          <ContainerRoute path="/manufacturer" component={ManufacturerPage} />
          <ContainerRoute path="/sale" component={SalePage} />
          <Redirect from='*' to='/not-found' />
        </Switch>
      </AppLayout>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth });
export default connect(mapStateToProps , actions)(AppRoute);
