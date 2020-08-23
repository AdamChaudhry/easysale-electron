import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cart from '../components/pos/Cart';
import * as actions from '../actions/pos';

class PosPage extends Component {
  componentDidMount() {
    const { getCustomers } = this.props;
    getCustomers();
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        height: '100%'
      }}>
        <div style={{ width: '50%'}}></div>
        <div style={{ width: '50%'}}>
          <Cart {...this.props}/>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ pos }) => ({ ...pos }),
  actions
)(PosPage);
