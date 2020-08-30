import React, { Component } from 'react';
import { Select, Input, Table, Descriptions, Button, Row, Col, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { debounce } from 'lodash';

const { Option } = Select;
const { Group } = Input;

class Cart extends Component {

  handleSearchProducts = debounce(({ target: { value }}) => {

  }, 500)

  render() {
    const { customers } = this.props;

    const customerOptions = customers.map(({ Name, _id }) => <Option key={_id} title={Name}>{Name}</Option>)
    return (
      <div style={{ height: '100%' }}>
        <Group compact>
          <Select
            allowClear
            showSearch
            style={{ width: 'calc(100% - 31px)' }}
            placeholder='Select Customer'>
            {customerOptions}
          </Select>
          <Button
            type='primary'
            icon={<PlusOutlined />}
          />
        </Group>
        <Select
          showSearch
          onSearch={(e) => console.log('........................', e)}
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
            height: 'calc(100% - 224px)',
            background: '#fff'
          }}>
          <Table />
        </div>
        <div style={{ background: '#fff', padding: '10px' }}>
          <Row>
            <Col span={11}>
              <Row>
                <Col span={12}>
                  Total Items
                </Col>
                <Col span={12}>
                  <div style={{ textAlign: 'right' }}>
                    <strong>0 (0)</strong>
                  </div>
                </Col>
              </Row>

              <Row style={{ marginTop: '5px' }}>
                <Col span={12}>
                  Discount
                </Col>
                <Col span={12}>
                  <div style={{ textAlign: 'right' }}>
                    <strong>Rs 123 </strong>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={2}>
              <div style={{ textAlign: 'center', height: '100%' }}>
                <Divider
                  orientation='center'
                  type='vertical'
                  style={{ height: '100%' }}
                />
              </div>
            </Col>
            <Col span={11}>
              <Row>
                <Col span={12}>
                  Total Items
                </Col>
                <Col span={12}>
                  <div style={{ textAlign: 'right' }}>
                    <strong>0 (0)</strong>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col span={12}>
                  Tax
                </Col>
                <Col span={12}>
                  <div style={{ textAlign: 'right' }}>
                    <strong>0 (0)</strong>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ marginTop: '5px' }}>
            <Col span={12}>
              <h2>Total Payable</h2>
            </Col>
            <Col span={12}>
              <h2>
                <div style={{ textAlign: 'right' }}>Rs 1,454</div>
              </h2>
            </Col>
          </Row>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{ width: '33.33%' }}
              type='dashed'>
              Delete
            </Button>
            <Button style={{ marginLeft: '5px', width: '33.33%' }}>
              Hold
            </Button>
            <Button
              style={{ marginLeft: '5px', width: '33.33%' }}
              type='primary'>
              Proceed
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Cart;
