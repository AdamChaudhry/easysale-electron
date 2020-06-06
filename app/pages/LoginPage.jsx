import React, { Component } from 'react';
import { Avatar, Form, Typography, Input, Button } from 'antd';
import { UserOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;
const { Group } = Input;

class PageNotFound extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}>
        <div style={{ textAlign: 'center' }}>
          <div>
            <Avatar
              icon={<UserOutlined />}
              src='https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=0hb44OrI'
              shape='circle'
              size={150}
            />
          </div>
          <Text style={{ fontSize: '26px' }}>Adam Anjum</Text>
          <br />
          <Text>Admin</Text>
          <Group compact>
            <Input.Password
              placeholder='Password'
              style={{
                width: 'calc(100% - 32px)',
                textAlign: 'left'
              }}
            />
            <Button icon={<ArrowRightOutlined />} type='primary' />
          </Group>
          <a href='#'>Login with different user</a>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
