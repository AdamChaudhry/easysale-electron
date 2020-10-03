import React, { useState } from 'react';
import { Modal, Switch, Input, Button } from 'antd';

const { Group } = Input;

const style = {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid #d0d0d0'
}

export default ({ isCheckoutModalOpen, onClose, cartItems, getCartSummery }) => {
  const [isPayWithCard, setIsPayWithCard] = useState(false);
  const [subTotal, totalItems, totalCartRows] = getCartSummery();
  const [notes, setNotes] = useState('');
  const [totalPaying, setTotalPaying] = useState(0);
  const balance = totalPaying - subTotal;

  const handleOnChangeTotalPaying = ({ target: { value }}) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setTotalPaying(value)
    }
  }

  const handleOnPreset = (amount) => {
    setTotalPaying(amount);
  }

  return (
    <Modal
      okText='Checkout'
      title='Checkout'
      onCancel={onClose}
      closable={false}
      visible={isCheckoutModalOpen}>
      <div>
        <div style={style}>
          <div>Customer</div>
          <div>Adam</div>
        </div>
        <div style={style}>
          <div>Total Items</div>
          <div>{totalCartRows}({totalItems})</div>
        </div>
        <div style={style}>
          <div>Discount</div>
          <div>Rs 0</div>
        </div>
        <div style={{ ...style, border: '0px' }}>
          <div>
            <h2>Total Payable</h2>
          </div>
          <div>
            <h2>Rs {subTotal}</h2>
          </div>
        </div>
        <Input
          placeholder='Optional'
          addonBefore='Notes'
          value={notes}
          onChange={({ target: { value }}) => setNotes(value)}
        />
        <div style={{
          ...style,
          border: '0px',
          alignItems: 'center',
          marginTop: '20px'
        }}>
          <div>
            <Switch
              checked={isPayWithCard}
              onChange={(isPayWithCard) => setIsPayWithCard(isPayWithCard)}
              checkedChildren='Pay with Card'
              unCheckedChildren='Pay with Cash'
            />
          </div>
          <div>
            <Input
              disabled={!isPayWithCard}
              addonBefore='Card No.'
              style={{ width: '320px' }}
            />
          </div>
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <strong>Currency Presets</strong>
        </div>
        <div style={{ ...style, border: '0px' }}>
          <Button onClick={() => handleOnPreset(10)} disabled={isPayWithCard} size='small'>Rs 10</Button>
          <Button onClick={() => handleOnPreset(20)} disabled={isPayWithCard} size='small'>Rs 20</Button>
          <Button onClick={() => handleOnPreset(50)} disabled={isPayWithCard} size='small'>Rs 50</Button>
          <Button onClick={() => handleOnPreset(100)} disabled={isPayWithCard} size='small'>Rs 100</Button>
          <Button onClick={() => handleOnPreset(500)} disabled={isPayWithCard} size='small'>Rs 500</Button>
          <Button onClick={() => handleOnPreset(1000)} disabled={isPayWithCard} size='small'>Rs 1,000</Button>
          <Button onClick={() => handleOnPreset(5000)} disabled={isPayWithCard} size='small'>Rs 5,000</Button>
        </div>
        <Input
          disabled={isPayWithCard}
          style={{ marginTop: '20px', textAlign: 'right' }}
          addonBefore='Total Paying (Rs)'
          value={totalPaying}
          onChange={handleOnChangeTotalPaying}
        />
        <div style={{ ...style, border: '0px' }}>
          <div>
            <h2>Customer's Balance</h2>
          </div>
          <div>
            <h2>Rs {balance < 0 ? 0 : balance}</h2>
          </div>
        </div>
      </div>
    </Modal>
  )
}
