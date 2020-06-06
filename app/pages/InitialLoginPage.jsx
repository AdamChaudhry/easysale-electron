import React, { Component } from 'react';
import { Avatar, Form, Typography, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;
const { Group } = Input;

class InitialLoginPage extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}>
        <Form style={{ width: '500px' }} name='normal_login' className='login-form' initialValues={{ remember: true }}>
          <div
            style={{
              textAlign: 'center',
              fontSize: '35px',
              marginBottom: '20px'
            }}>
            Login
          </div>
          <Form.Item name='username' rules={[ { required: true, message: 'Please input your Username!' } ]}>
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
          </Form.Item>
          <Form.Item name='password' rules={[ { required: true, message: 'Please input your Password!' } ]}>
            <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
          </Form.Item>
          <Form.Item>
            <a href=''>
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <div style={{ float: 'right' }}>
              <Button
                style={{
                  marginRight: '10px',
                  width: '150px'
                }}>
                Cancel
              </Button>
              <Button style={{ width: '150px' }} type='primary' htmlType='submit'>
                Log in
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default InitialLoginPage;
