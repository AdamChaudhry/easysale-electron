import React, { Component } from 'react';

import Cart from '../components/pos/Cart';

class PosPage extends Component {
  render() {
    return (
      <div style={{
        display: 'flex',
        height: '100%'
      }}>
        <div style={{ width: '50%'}}></div>
        <div style={{ width: '50%'}}>
          <Cart/>
        </div>
      </div>
    )
  }
}

export default PosPage;
