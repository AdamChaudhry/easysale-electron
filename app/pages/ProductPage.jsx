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
import { PRODUCT_TYPE } from '../config/constants.json';

const { Group } = Input;
const { Option } = Select;

class PageProduct extends Component {
  state = {
    isSaveProductModalOpen: false
  };

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

  handleSearchProduct = (value) => {
    const { getProductsByName } = this.props;
    getProductsByName({ name: value });
  }

  handleSaveProduct = ({ resetFields, type, comboProducts, ...rest }) => {
    const { saveProduct, getProducts } = this.props;

    if (type == PRODUCT_TYPE.COMBO) {
      comboProducts = comboProducts.map(({ comboQty, _id }) => ({
        Qty: comboQty,
        ProductId: _id
      }));
    }

    saveProduct({ type, comboProducts, ...rest }).then(({ isAdded }) => {
      if (!isAdded) return;

      this.setState({ isSaveProductModalOpen: false });
      resetFields();
      getProducts();
    })
  }

  render() {
    const { isSaveProductModalOpen } = this.state;
    const { products, loading, total, pagination, categories, manufacturers, newProduct } = this.props;
    const { pageNo, pageSize } = pagination || {};
    const { products: searchedProducts, loading: searchingProducts } = newProduct || {};

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
              onClick={() => this.setState({ isSaveProductModalOpen: true })}
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
          okText='Save'
          visible={isSaveProductModalOpen}
          title='New Product'
          categories={categories}
          manufacturers={manufacturers}
          onChangeSearch={this.handleSearchProduct}
          searchedProducts={searchedProducts}
          searchingProducts={searchingProducts}
          onSubmit={this.handleSaveProduct}
          onClose={() => this.setState({ isSaveProductModalOpen: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  ...products
});

export default connect(mapStateToProps, actions)(PageProduct);
