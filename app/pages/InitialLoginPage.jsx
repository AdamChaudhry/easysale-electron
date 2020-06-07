import React, { Component } from 'react';
import { Avatar, Form, Typography, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import * as actions from '../actions/auth';

const { Text, Title } = Typography;
const { Group } = Input;

class InitialLoginPage extends Component {
  handleLogin = () => {
    const { login } = this.props;
    const { validateFields } = this.form;

    validateFields()
      .then(({ email, password }) => login({ email, password }))
      .catch(() => {});
  };
  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}>
        <Form style={{ width: '500px' }} name='login' initialValues={{ remember: true }} ref={(ref) => this.form = ref}>
          <div
            style={{
              textAlign: 'center',
              fontSize: '35px',
              marginBottom: '20px'
            }}>
            Login
          </div>
          <Form.Item name='email' rules={[ { required: true, message: 'Please input your Email!' } ]}>
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
          </Form.Item>
          <Form.Item name='password' rules={[ { required: true, message: 'Please input your Password!' } ]}>
            <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
          </Form.Item>
          <Form.Item>
            <a href=''>Forgot password</a>
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
              <Button style={{ width: '150px' }} type='primary' onClick={this.handleLogin}>
                Log in
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth });
export default connect(mapStateToProps, actions)(InitialLoginPage);
