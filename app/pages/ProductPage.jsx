import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  Pagination,
  Select,
  Button,
  Icon,
  Input,
  PageHeader,
  Spin,
  Tooltip
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import moment from 'moment';
import { debounce } from 'lodash';

import * as actions from '../actions/products';
import ProductGrid from '../components/product/grid';
import AddProductModal from '../components/product/AddProductModal';

const { Group } = Input;
const { Option } = Select;

class PageProduct extends Component {
  componentDidMount() {
    const { getProducts, getCategory, getManufacturer } = this.props;
    getProducts();
    getCategory();
    getManufacturer();
  }

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
            <Button
              key='4'
              type='primary'>
              New Product
            </Button>
          ]}
        />
       <ProductGrid {...this.props}/>
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
        <AddProductModal
          visible={true}
          title='New Product'
          categories={categories}
          manufacturers={manufacturers}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  ...products
});

export default connect(mapStateToProps, actions)(PageProduct);
