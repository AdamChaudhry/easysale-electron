import React from 'react';
import { Menu, Divider } from 'antd';
import { Link } from 'react-router-dom';
import {
  LineChartOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  DollarOutlined,
  UserOutlined,
  SisternodeOutlined,
  AppstoreOutlined,
  FileDoneOutlined
} from '@ant-design/icons';

const { SubMenu, Item } = Menu;

const DashboardHeader = () => {
  const path = window.location.hash;
  let subKey = path.split(/\-|\//)[1];
  return (
    <Menu
      theme="dark"
      style={{ height: '100%' }}
      selectedKeys={[path]}
      mode="inline"
    >
      <Item key="#/dashboard" icon={<LineChartOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Item>
      <Item key="#/pos" icon={<ShoppingCartOutlined />}>
        <Link to="/pos">POS</Link>
      </Item>
      <SubMenu
        key="sub1"
        title={
          <span>
            <DollarOutlined />
            <span>Sale</span>
          </span>
        }
      >
        <Item key="#/sale">
          <Link to="/sale">Sale History</Link>
        </Item>
        <Item key="4">Sale on Hold</Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={
          <span>
            <FileDoneOutlined />
            <span>Purchase</span>
          </span>
        }
      >
        <Item key="#/purchase-page">
          <Link to="/purchase-page">New Purchase</Link>
        </Item>
        <Item key="#/purchase-history">
          <Link to="/purchase-history">Purchase History</Link>
        </Item>
        <Item key="7">New Expense</Item>
        <Item key="8">Expense History</Item>
      </SubMenu>
      <SubMenu
        key="sub-product"
        title={
          <span>
            <AppstoreOutlined />
            <span>Products</span>
          </span>
        }
      >
        <Item key="9">New Products</Item>
        <Item key="#/product">
          <Link to="/product">Product List</Link>
        </Item>
        <Item key="#/import-product">
          <Link to="/import-product">Import Products</Link>
        </Item>
      </SubMenu>
      <SubMenu
        key="sub-sub4"
        onTitleClick={({ key }) => (subKey = key)}
        title={
          <span>
            <SisternodeOutlined />
            <span>Category</span>
          </span>
        }
      >
        <Item key="12">New Category</Item>
        <Item key="#/category">
          <Link to="/category">Category List</Link>
        </Item>
        <Item key="14">Import Category</Item>
      </SubMenu>
      <SubMenu
        key="sub5"
        title={
          <span>
            <SettingOutlined />
            <span>Manufacturer</span>
          </span>
        }
      >
        <Item key="16">New Manufacturer</Item>
        <Item key="#/manufacturer">
          <Link to="/manufacturer">Manufacturer List</Link>
        </Item>
        <Item key="18">Import Manufacturer</Item>
      </SubMenu>
      <SubMenu
        key="sub6"
        title={
          <span>
            <UserOutlined />
            <span>Person</span>
          </span>
        }
      >
        <Item key="19">Add User</Item>
        <Item key="20">User List</Item>
        <Item key="21">Add Customer</Item>
        <Item key="22">Customer List</Item>
      </SubMenu>
    </Menu>
  );
};

export default DashboardHeader;
