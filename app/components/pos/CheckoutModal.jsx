import React from 'react';
import { Modal, Switch, Input, Button } from 'antd';

const { Group } = Input;

const style = {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid #d0d0d0'
}

export default () => {
  return (
    <Modal
      okText='Checkout'
      title='Checkout'
      visible={true}>
      <div>
        <div style={style}>
          <div>Customer</div>
          <div>Adam</div>
        </div>
        <div style={style}>
          <div>Total Items</div>
          <div>Adam</div>
        </div>
        <div style={style}>
          <div>Discount</div>
          <div>Adam</div>
        </div>
        <div style={{ ...style, border: '0px' }}>
          <div>
            <h2>Total Payable</h2>
          </div>
          <div>
            <h2>Adam</h2>
          </div>
        </div>
        <Input
          placeholder='Optional'
          addonBefore='Notes'
        />
        <div style={{
          ...style,
          border: '0px',
          alignItems: 'center',
          marginTop: '20px'
        }}>
          <div>
            <Switch
              checkedChildren='Pay with Card'
              unCheckedChildren='Pay with Cash'
            />
          </div>
          <div>
            <Input
              addonBefore='Card No.'
              style={{ width: '320px' }}
            />
          </div>
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <strong>Currency Presets</strong>
        </div>
        <div style={{ ...style, border: '0px' }}>
          <Button size='small'>Rs 10</Button>
          <Button size='small'>Rs 20</Button>
          <Button size='small'>Rs 50</Button>
          <Button size='small'>Rs 100</Button>
          <Button size='small'>Rs 500</Button>
          <Button size='small'>Rs 1,000</Button>
          <Button size='small'>Rs 5,000</Button>
        </div>
        <Input
          style={{ marginTop: '20px' }}
          addonBefore='Total Paying'
        />
        <div style={{ ...style, border: '0px' }}>
          <div>
            <h2>Customer's Balance</h2>
          </div>
          <div>
            <h2>Adam</h2>
          </div>
        </div>
      </div>
    </Modal>
  )
}
