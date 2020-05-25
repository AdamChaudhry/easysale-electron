import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  Pagination,
  Select,
  Button,
  Icon,
  Input,
  PageHeader,
  Spin
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { debounce } from 'lodash';

import * as actions from '../actions/products';

const { Group } = Input;
const { Option } = Select;

class PageNotFound extends Component {
  componentDidMount() {
    const { getProducts, getCategory, getManufacturer } = this.props;
    getProducts();
    getCategory();
    getManufacturer();
  }

  columnDefs = [
    {
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      width: 50,
      pinned: 'left'
    },
    {
      headerName: 'Code',
      field: 'Code',
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    },
    {
      headerName: 'Name',
      field: 'Name',
      width: 250
    },
    {
      headerName: 'Description',
      field: 'Description',
      width: 150,
      cellRenderer: ({ value }) => value || 'N/A'
    },
    {
      headerName: 'Category',
      field: 'Category.Name',
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    },
    {
      headerName: 'Manufacturer',
      field: 'Manufacturer.Name',
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    },
    {
      headerName: 'Type',
      field: 'Type',
      width: 100
      // cellRenderer: ({ value }) => value || 'N/A'
    },
    {
      headerName: 'Min. Qty',
      field: 'MinQty',
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    },
    {
      headerName: 'Stock',
      field: 'Stock.Qty',
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    },
    {
      headerName: 'Cost',
      field: 'Cost',
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    },
    {
      headerName: 'Price',
      field: 'Price',
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    },
    {
      headerName: 'Created At',
      field: 'CreatedAt',
      width: 150,
      cellRenderer: ({ value }) => (value ? moment(value).format('LL') : 'N/A')
    },
    {
      headerName: 'Actions',
      width: 90,
      pinned: 'right',
      cellRendererFramework: ({ data }) => {
        return (
          <div>
            <Group>
              <Button size="small" icon='edit'/>
              <Button size="small"/>
            </Group>
          </div>
        );
      }
    }
  ];

  handleSetKeyword = debounce(({ target: { value }}) => {
    const { SetFilter, getProducts, setPage } = this.props;
    SetFilter({
      key: 'keyword',
      value
    });

    setPage({ pageNo: 1 });
    getProducts();
  }, 500);

  handlePageChange = (pageNo) => {
    const { setPage, getProducts } = this.props;
    setPage({ pageNo });
    getProducts();
  }

  handlePageSizeChange = (pageNo, pageSize) => {
    const { setPageSize, getProducts, setPage } = this.props;
    setPageSize({ pageSize });
    setPage({ pageNo: 1 });
    getProducts();
  }

  handleCategoryFilter = (CategoryId) => {
    const { SetFilter, getProducts, setPage } = this.props;
    SetFilter({
      key: 'CategoryId',
      value: CategoryId
    });

    setPage({ pageNo: 1 });
    getProducts();
  }

  handleManufacturerFilter = (ManufacturerId) => {
    const { SetFilter, getProducts, setPage } = this.props;
    SetFilter({
      key: 'ManufacturerId',
      value: ManufacturerId
    });

    setPage({ pageNo: 1 });
    getProducts();
  }

  render() {
    const { products, loading, total, pagination, categories, manufacturers } = this.props;
    const { pageNo, pageSize } = pagination || {};

    const categoryOptions = categories.map(({ Name, _id }) => <Option key={_id} label={Name}>{Name}</Option>)
    const manufacturerOptions = manufacturers.map(({ Name, _id }) => <Option key={_id} label={Name}>{Name}</Option>)
    return (
      <div style={{ height: 'calc(100% - 95px)'}}>
        <PageHeader
          style={{
            height: '53px',
            marginBottom: '10px',
            padding: '7px'
          }}
          title="Product"
          extra={[
            <Input
              key="3"
              width={150}
              style={{ width: '150px', marginRight: '5px' }}
              placeholder="Search"
              allowClear
              onChange={(e) => {
                e.persist();
                this.handleSetKeyword(e);
              }}
            />,
            <Select
              key='2'
              style={{ width: '150px', marginRight: '5px' }}
              placeholder="Select Category"
              allowClear
              onChange={this.handleCategoryFilter}
              optionFilterProp='label'
              showSearch>
              {categoryOptions}
            </Select>,
            <Select
              key='1'
              style={{ width: '150px' }}
              placeholder="Select Manufacturer"
              allowClear
              onChange={this.handleManufacturerFilter}
              optionFilterProp='label'
              showSearch>
              {manufacturerOptions}
            </Select>,
          ]}
        />
        <Spin spinning={loading !== 0}>
          <div
            className="ag-theme-alpine"
            style={{ height: '100%', width: '100%' }}>
            <AgGridReact
              columnDefs={this.columnDefs}
              rowData={products}
              animateRows={true}
            />
          </div>
        </Spin>
        <div style={{ padding: '5px 0px', float: 'right' }}>
          <Pagination
            showSizeChanger
            showQuickJumper
            onChange={this.handlePageChange}
            total={total}
            pageSize={pageSize}
            current={pageNo}
            showTotal={(total, [start, end]) => `Showing ${start} to ${end} of ${total}` }
            onShowSizeChange={this.handlePageSizeChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  ...products
});

export default connect(mapStateToProps, actions)(PageNotFound);
