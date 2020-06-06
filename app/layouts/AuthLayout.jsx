import React, { Component } from 'react';
import { Layout, PageHeader } from 'antd';

const { Header, Content } = Layout;
class AppLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <Layout style={{ height: '100vh' }}>
        <PageHeader
          title='EasySale'
          style={{ backgroundColor: '#e6315a', color: '#fff'}}
        />
        <Content>{children}</Content>
      </Layout>
    );
  }
}

export default AppLayout;
