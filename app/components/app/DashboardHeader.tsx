import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const DashboardHeader = () => {
  return (
    <Header>
      {/* <Navbar appearance='inverse'>
        <Navbar.Header>
          <div
            style={{
              padding: '18px 20px',
              display: 'inline-block'
            }}>
            EasySale
          </div>
        </Navbar.Header>
        <Navbar.Body>
          <Nav pullRight>
            <Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar> */}
    </Header>
  )
}

export default DashboardHeader;
