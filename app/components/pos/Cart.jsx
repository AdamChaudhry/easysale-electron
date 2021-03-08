import React, { Component } from 'react';
import { Select, Input, Table, Descriptions, Button, Row, Col, Divider, InputNumber, Tooltip, notification } from 'antd';
import { PlusOutlined, DeleteOutlined, PercentageOutlined } from '@ant-design/icons'
import { debounce } from 'lodash';

import CheckoutModal from './CheckoutModal';
import DiscountModal from './DiscountModal';

import getDiscount from '../../utils/get-discount';
import { NUMBER } from '../../constants/regex';
import CartItem from '../../utils/models/CartItem';

const { Option } = Select;
const { Group } = Input;

class Cart extends Component {
  state = {
    cartItems: [],
    isCheckoutModalOpen: false,
    customerId: '',
    isDiscountModalOpen: false,
    selectedProductId: ''
  }

  handleProceed = () => {
    const { cartItems } = this.state;

    if (!cartItems || !cartItems.length) {
      return notification.info({
        message: 'CHECK OUT',
        description: 'Please add products into Cart to proceed.',
        placement: 'bottomRight'
      });
    }

    this.setState({ isCheckoutModalOpen: true });
  }

  handleDiscountModal = ({ productId }) => {
    this.setState({
      selectedProductId: productId,
      isDiscountModalOpen: true
    });
  }

  handleApplyDiscount = (discount) => {
    const { cartItems, selectedProductId } = this.state;
    const index = cartItems.findIndex(({ ProductId }) => ProductId == selectedProductId.ProductId);
    if (index !== -1) {
      cartItems[index].discount = discount;
      this.setState({ cartItems: [...cartItems] });
    }
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
      key: 'Name',
      render: (text, { getProductName }) => getProductName()
    },
    {
      title: 'Qty',
      dataIndex: 'Qty',
      key: 'Qty',
      width: 100,
      align: 'center',
      render: (text, record) => {
        const { getProductId, getQty } = record;
        return (
          <InputNumber
            size='small'
            width={50}
            value={getQty()}
            min={1}
            onPressEnter={({ target: { value }}) => this.handleOnChangeQty({ value, productId: getProductId() })}
          />
        )
      }
    },
    {
      title: 'Price',
      key: 'Price',
      render: (text, { getEachPrice }) => getEachPrice()
    },
    {
      title: 'Total',
      render: (text, record) => {
        const { getDiscountLineTotal, getLineTotal, isDiscountApplied } = record;

        const ConditionalWrapper = ({ condition, wrapper, children }) =>
          condition ? wrapper(children) : children;

        return (
          <div>
            <div>
              <ConditionalWrapper
                condition={isDiscountApplied()}
                wrapper={
                  children => (
                    <small>
                      <strike>{children}</strike>
                    </small>
                  )
                }>
                {getLineTotal()}
              </ConditionalWrapper>
            </div>
            <div>
              {isDiscountApplied() && <strong>{getDiscountLineTotal()}</strong>}
            </div>
          </div>
        );
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
                  onClick={() => this.handleDiscountModal({ productId: record.getProductId() })}
                />
              </Tooltip>
              <Tooltip
                title='Remove from Cart'
                placement='topLeft'>
                <Button
                  size='small'
                  type='dashed'
                  onClick={() => this.handleDeleteCartItem({ ProductId: record.ProductId })}
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

    const index = cartItems.findIndex(({ isProductAdded }) => isProductAdded({ productId: product._id}));
    if (index !== -1) {
      const { setQty, getQty } = cartItems[index];
      setQty((getQty() + 1));
    }
    else {
      cartItems.push(
        new CartItem({
          productId: product._id,
          name: product.Name,
          qty: 1,
          price: product.Price
        })
      );
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

  handleOnChangeQty = ({ value, productId }) => {
    if (!NUMBER.test(value)) return;

    const { cartItems } = this.state;
    const index = cartItems.findIndex(({ isProductAdded }) => isProductAdded({ productId }));
    if (index !== -1) {
      cartItems[index].setQty(+value);
      this.setState({ cartItems: [...cartItems] });
    }
  }

  handleDeleteCartItem = ({ ProductId }) => {
    const { cartItems } = this.state;
    this.setState({
      cartItems: [...cartItems.filter((product) => product.ProductId != ProductId)]
    });
  }

  getCartSummery = () => {
    const { cartItems } = this.state;

    let subTotal = 0;
    let totalItems = 0;
    let netTotal = 0;
    let totalDiscount = 0;
    const totalCartRows = cartItems.length;

    cartItems.forEach(({ Qty, Price, discount }) => {
      subTotal += Qty * Price;
      totalItems += Qty;
    })

    return [subTotal, totalItems, totalCartRows];
  }

  render() {
    const { customers, products } = this.props;
    const { cartItems } = this.state;

    const [ subTotal, totalItems, totalCartRows ] = this.getCartSummery();

    const customerOptions = customers.map(({ Name, _id }) => <Option key={_id} value={_id} title={Name}>{Name}</Option>)
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
            onChange={(customerId) => this.setState({ customerId })}
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
            dataSource={cartItems}
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
              onClick={this.handleProceed}
              type='primary'>
              Proceed
            </Button>
          </div>
        </div>

        <CheckoutModal
          {...this.state}
          {...this.props}
          onClose={() => this.setState({ isCheckoutModalOpen: false })}
          getCartSummery={this.getCartSummery}
        />

        <DiscountModal
          {...this.state}
          onClose={() => this.setState({ isDiscountModalOpen: false })}
          onApplyDiscount={this.handleApplyDiscount}
        />
      </div>
    )
  }
}

export default Cart;
