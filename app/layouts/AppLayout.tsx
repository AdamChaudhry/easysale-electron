import React from 'react';
import { Layout } from 'antd';

const { Sider, Content } = Layout;

import DashboardHeader from '../components/app/DashboardHeader';
import DashboardSideBar from '../components/app/DashboardSideBar';

const AppLayout = ({ children }) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider collapsible={true}>
        <DashboardSideBar />
      </Sider>
      <Layout>
        {/* <DashboardHeader /> */}
        <Content style={{ margin: '10px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
