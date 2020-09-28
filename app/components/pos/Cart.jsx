import React, { Component } from 'react';
import { Select, Input, Table, Descriptions, Button, Row, Col, Divider, InputNumber, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, PercentageOutlined } from '@ant-design/icons'
import { debounce } from 'lodash';

import CheckoutModal from './CheckoutModal';

const { Option } = Select;
const { Group } = Input;

class Cart extends Component {
  state = {
    cartItems: []
  }

  columns = [
    {
      title: 'Code',
      dataIndex: 'Code',
      key: 'Code',
      width: 70,
      render: (text) => text || 'N/A'
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name'
    },
    {
      title: 'Qty',
      dataIndex: 'Qty',
      key: 'Qty',
      width: 100,
      align: 'center',
      render: (text, record) => {
        const { ProductId } = record;
        return (
          <InputNumber
            size='small'
            width={50}
            value={text}
            min={1}
            onPressEnter={(e) => this.handleOnChangeQty(e, ProductId)}
          />
        )
      }
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price'
    },
    {
      title: 'Total',
      render: (text, record) => {
        const { Qty, Price } = record;
        return Qty * Price;
      }
    },
    {
      title: 'Actions',
      align: 'right',
      render: (text, record) => {
        return (
          <div>
            <Group compact>
              <Tooltip
                title='Add Discount'
                placement='topLeft'>
                <Button
                  size='small'
                  type='primary'
                  icon={<PercentageOutlined />}
                />
              </Tooltip>
              <Tooltip
                title='Remove from Cart'
                placement='topLeft'>
                <Button
                  size='small'
                  type='dashed'
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Group>
          </div>
        )
      }
    }
  ]

  handleAddToCart = (product) => {
    const { cartItems } = this.state;

    const index = cartItems.findIndex(({ ProductId }) => ProductId == product._id);
    if (index !== -1) {
      cartItems[index].Qty += 1;
    }
    else {
      cartItems.push({
        ProductId: product._id,
        Name: product.Name,
        Qty: 1,
        Price: product.Price
      })
    }

    this.setState({ cartItems: [...cartItems] });
  }

  handleOnChangeSearch = (id) => {
    const { products } = this.props;
    const product = products.find(({ _id }) => _id == id);
    this.handleAddToCart(product);
  }

  handleSearchProducts = (name) => {
    const { getProductsByName } = this.props;
    getProductsByName({ name });
  }

  handleOnChangeQty = ({ target: { value }}) => {
    console.log('..............', value)
  }

  getCartSummery = () => {
    const { cartItems } = this.state;

    let subTotal = 0;
    let totalItems = 0;
    const totalCartRows = cartItems.length;

    cartItems.forEach(({ Qty, Price }) => {
      subTotal += Qty * Price;
      totalItems += Qty;
    })

    return [subTotal, totalItems, totalCartRows];
  }

  render() {
    const { customers, products } = this.props;
    const { cartItems } = this.state;

    const [ subTotal, totalItems, totalCartRows ] = this.getCartSummery();

    const customerOptions = customers.map(({ Name, _id }) => <Option key={_id} title={Name}>{Name}</Option>)
    const productOptions = products.map(({ Name, _id, Price, Stock }) => {
      return (
        <Option key={_id} value={_id}>
          <div>
            <div>{Name}</div>
            <div style={{ fontSize: '12px', display: 'flex' }}>
              <div style={{ width: '70px' }}>Rs {Price}</div>
              <div>Stock 5</div>
            </div>
          </div>
        </Option>
      )
    })
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
          filterOption={false}
          onSearch={this.handleSearchProducts}
          style={{
            width: '100%',
            marginTop: '5px'
          }}
          placeholder='Search Products'
          onChange={this.handleOnChangeSearch}
          showArrow={false}>
          {productOptions}
        </Select>
        <div
          style={{
            margin: '5px 0px',
            height: 'calc(100% - 224px)',
            background: '#fff'
          }}>
          <Table
            columns={this.columns}
            dataSource={cartItems.reverse()}
            pagination={false}
            size='small'
          />
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
                    <strong>{totalCartRows} ({totalItems})</strong>
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
                  Sub Total
                </Col>
                <Col span={12}>
                  <div style={{ textAlign: 'right' }}>
                    <strong>Rs {subTotal}</strong>
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
                <div style={{ textAlign: 'right' }}>Rs {subTotal}</div>
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

        <CheckoutModal/>
      </div>
    )
  }
}

export default Cart;
