import React from 'react';
import { Menu, Divider } from 'antd';
import { LineChartOutlined, ShoppingCartOutlined, SettingOutlined, DollarOutlined, UserOutlined, SisternodeOutlined, AppstoreOutlined, FileDoneOutlined } from '@ant-design/icons';

const { SubMenu, Item } = Menu;

const DashboardHeader = () => {
  return (
    <Menu
        theme='dark'
        style={{ height: '100%' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        inlineCollapsed={true}>
        <Item key="1" icon={<LineChartOutlined />}>Dashboard</Item>
        <Item key="2" icon={<ShoppingCartOutlined />}>POS</Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <DollarOutlined />
              <span>Sale</span>
            </span>
          }>
          <Item key="3">Sale History</Item>
          <Item key="4">Sale on Hold</Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <FileDoneOutlined />
              <span>Purchase</span>
            </span>
          }>
          <Item key="5">New Purchase</Item>
          <Item key="6">Purchase History</Item>
          <Item key="7">New Expense</Item>
          <Item key="8">Expense History</Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <AppstoreOutlined />
              <span>Products</span>
            </span>
          }>
          <Item key="9">New Products</Item>
          <Item key="10">Product List</Item>
          <Item key="11">Import Products</Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <SisternodeOutlined />
              <span>Category</span>
            </span>
          }>
          <Item key="12">New Category</Item>
          <Item key="13">Category List</Item>
          <Item key="14">Import Category</Item>
        </SubMenu>
        <SubMenu
          key="sub5"
          title={
            <span>
              <SettingOutlined />
              <span>Manufacturer</span>
            </span>
          }>
          <Item key="16">New Manufacturer</Item>
          <Item key="17">Manufacturer List</Item>
          <Item key="18">Import Manufacturer</Item>
        </SubMenu>
        <SubMenu
          key="sub6"
          title={
            <span>
              <UserOutlined />
              <span>Person</span>
            </span>
          }>
          <Item key="19">Add User</Item>
          <Item key="20">User List</Item>
          <Item key="21">Add Customer</Item>
          <Item key="22">Customer List</Item>
        </SubMenu>
      </Menu>
  )
}

export default DashboardHeader;
