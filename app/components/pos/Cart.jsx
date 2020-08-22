import React, { Component } from 'react';
import { Select, Input, Table, Descriptions, Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons'

const { Option } = Select;
const { Group } = Input;

class Cart extends Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Group compact>
          <Select
            style={{ width: 'calc(100% - 31px)' }}
            placeholder='Select Customer'
          />
          <Button
            type='primary'
            icon={<PlusOutlined />}
          />
        </Group>
        <Select
          style={{
            width: '100%',
            marginTop: '5px'
          }}
          placeholder='Search Products'
          showArrow={false}
        />
        <div
          style={{
            margin: '5px 0px',
            height: 'calc(100% - 155px)',
            background: '#fff'
          }}>
          <Table/>
        </div>
        <div style={{ background: '#fff' }}>
          <Row>
            <Col>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Cart;
