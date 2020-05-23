import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PageNotFound extends Component {
  render() {
    return (
      <div>
        this is login
        <Link to='./product'>
          Products =>
        </Link>
      </div>
    );
  }
};

export default PageNotFound;
