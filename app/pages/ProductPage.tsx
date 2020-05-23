import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Pagination, InputPicker, IconButton, ButtonGroup, Icon } from 'rsuite';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from '../actions/products';

class PageNotFound extends Component {
  componentDidMount() {
    const { getProducts } = this.props;
    getProducts();
  }

  columnDefs = [
    {
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      width: 50,
      pinned: 'left'
    }, {
      headerName: "Code",
      field: "Code",
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    }, {
      headerName: "Name",
      field: "Name",
      width: 250
    }, {
      headerName: "Description",
      field: "Description",
      width: 150,
      cellRenderer: ({ value }) => value || 'N/A'
    }, {
      headerName: "Category",
      field: "Category",
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    }, {
      headerName: "Manufacturer",
      field: "Manufacturer",
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    }, {
      headerName: "Type",
      field: "Type",
      width: 100,
      //cellRenderer: ({ value }) => value || 'N/A'
    }, {
      headerName: "Min. Qty",
      field: "MinQty",
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    }, {
      headerName: "Stock",
      field: "Stock.Qty",
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    }, {
      headerName: "Cost",
      field: "Cost",
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    }, {
      headerName: "Price",
      field: "Price",
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    }, {
      headerName: "Created At",
      field: "CreatedAt",
      width: 150,
      cellRenderer: ({ value }) => value ? moment(value).format('LL') : 'N/A'
    }, {
      headerName: "Actions",
      width: 110,
      pinned: 'right',
      cellRendererFramework: ({ data }) => {
        return (
          <div>
            <ButtonGroup>
              <IconButton
                size='xs'
                appearance='primary'>
              </IconButton>
              <IconButton
                size='xs'
                appearance='primary'>
              </IconButton>
            </ButtonGroup>
          </div>
        )
      }
    }
  ]

  render() {
    const { products } = this.props;
    return (
      <div style={{ height: 'calc(100% - 100px)', marginTop: '-10px' }}>
        <div style={{ height: '50px', display: 'flex', alignItems: 'center' }}>
          <h4>Products</h4>
          <div style={{ marginLeft: 'auto' }}>
            <InputPicker />
          </div>
        </div>
        <div
          className="ag-theme-alpine"
          style={{ height: '100%', width: '100%' }}>
          <AgGridReact
            columnDefs={this.columnDefs}
            rowData={products}>
          </AgGridReact>
        </div>
        <div style={{ padding: '5px 0px', textAlign: 'center' }}>
          <Pagination pages={10} activePage={1} />;
        </div>
      </div>
    );
  }
};

const mapStateToProps = ({ products }) => ({
  ...products
});

export default connect(mapStateToProps, actions)(PageNotFound);
