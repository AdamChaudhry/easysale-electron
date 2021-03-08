import React, { useState } from 'react';
import { Modal, Input, Form, Radio, InputNumber, Select, Descriptions, Divider, Tooltip } from 'antd';
import { PercentageOutlined, DollarCircleOutlined } from '@ant-design/icons'

import getDiscount from '../../utils/get-discount';
import { NUMBER } from '../../constants/regex';

import { round } from 'lodash';
const { Group } = Input;

const DISCOUNT_REASONS = [
  'Promotion Discount'
]
  .map((reason, index) =>
    <Select key={index} value={index}>{reason}</Select>);

const Discount = ({ isDiscountModalOpen, onClose, selectedProductId, onApplyDiscount, cartItems }) => {
  const { getName, getPrice, setDiscount } = cartItems. || {};
  const [form] = Form.useForm();
  //const [discount, setDiscount] = useState({});

  const handleDiscount = (changedValue, { discountValue, discountType }) => {
    if (NUMBER.test(discountValue)) {
      setDiscount(getDiscount({
        price: getPrice(),
        value: discountValue,
        type: discountType
      }));
    }
    else {
      setDiscount(getDiscount({
        price: getPrice,
        value: 0,
        type: 'percentage'
      }));
    }
  }

  const resetStates = () => {
    form.resetFields();
    setDiscount({
      newPrice: getPrice,
      discount: 0,
      percentage: 0
    });
  }

  const onSubmit = () => {
    form.validateFields()
      .then((values) => {
        onApplyDiscount(values);
        resetStates();
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log('........')

  return (
    <Modal
      okText='Apply Discount'
      visible={isDiscountModalOpen}
      onCancel={() => {
        onClose();
        resetStates()
      }}
      onOk={onSubmit}
      title={getName()}>
      <Form
        layout='vertical'
        form={form}
        onValuesChange={handleDiscount}
        initialValues={{
          discountType: 'percentage'
        }}>
        <Form.Item label='Enter Discount'>
          <Group compact>
            <Form.Item
              noStyle
              name='discountValue'
              rules={[
                {
                  required: true,
                  message: 'Pease enter discount value.'
                },
                {
                  type: 'number',
                  message: 'Please enter valid value.'
                }
              ]}>
              <InputNumber
                placeholder='Enter Discount Value...'
                style={{ width: 'calc(100% - 277px)' }}
                min={0}
              />
            </Form.Item>
            <Form.Item
              noStyle
              name='discountType'>
              <Radio.Group buttonStyle='solid'>
                <Tooltip title='Percentage'>
                  <Radio.Button value='percentage'>
                    <PercentageOutlined />
                  </Radio.Button>
                </Tooltip>
                <Tooltip title='Flate'>
                  <Radio.Button value='flate'>
                    <DollarCircleOutlined />
                  </Radio.Button>
                </Tooltip>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              noStyle
              name='reason'
              rules={[
                { required: true, message: 'Please select discount reason.' }
              ]}>
              <Select placeholder='Please select reason'>
                {DISCOUNT_REASONS}
              </Select>
            </Form.Item>
          </Group>
        </Form.Item>
      </Form>
      <Divider>Discount Summery</Divider>
      <Descriptions
        bordered
        size='small'>
        <Descriptions.Item span={3} label='Price'>Rs. {Price}</Descriptions.Item>
        <Descriptions.Item span={3} label='Discount'>Rs. -{discount.discount} ({discount.percentage}%)</Descriptions.Item>
        <Descriptions.Item span={3} label='New Price'> Rs. {discount.newPrice}</Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default Discount;
