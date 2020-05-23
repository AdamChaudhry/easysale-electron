import React, { Component } from 'react';

class AppLayout extends Component {
  render() {
    const { children } = this.props;
    return (
     <div>
       From Auth layout
       <br/>
       {children}
      </div>
    );
  }
}

export default AppLayout;
