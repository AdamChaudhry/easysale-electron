import React from 'react';
import { Layout } from 'antd';
import DashboardSideBar from '../components/app/DashboardSideBar';
const { Sider, Content } = Layout;


const AppLayout = ({ children }) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider collapsible={true}>
        <DashboardSideBar />
      </Sider>
      <Layout>
        <Content style={{ margin: '10px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
