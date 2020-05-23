import React from 'react';
import { Container, Sidebar, Content } from 'rsuite';

import DashboardHeader from '../components/app/DashboardHeader';
import DashboardSideBar from '../components/app/DashboardSideBar';

const AppLayout = ({ children }) => {
  return (
    <Container style={{ height: '100vh' }}>
      <DashboardHeader />
      <Container>
        <Sidebar>
          <DashboardSideBar />
        </Sidebar>
        <Content style={{ margin: '10px' }}>{children}</Content>
      </Container>
    </Container>
  );
}

export default AppLayout;
