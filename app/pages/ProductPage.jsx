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
  Tooltip,
  Dropdown,
  Menu
} from 'antd';
import { EditOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import moment from 'moment';
import { debounce } from 'lodash';

import * as actions from '../actions/products';
import ProductGrid from '../components/product/grid';
import AddProductModal from '../components/product/AddProductModal';
import { PRODUCT_TYPE } from '../config/constants.json';
import { exportAsXlsx } from '../components/product/export';

const { Group } = Input;
const { Option } = Select;

class PageProduct extends Component {
  state = {
    isSaveProductModalOpen: false,
    isEditable: true,
    selectedRow: {}
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

  handleEditProduct = ({ data }) => {
    const { getComboProducts } = this.props;

    this.setState({
      isSaveProductModalOpen: true,
      isEditable: true,
      selectedRow: data
    });

    const { Type, Combo = [] } = data;
    if (Type == PRODUCT_TYPE.COMBO) {
      const ids = Combo.map(({ _id }) => _id);
      getComboProducts({ ids }).then(({ products }) => {
        this.AddProduct.setComboProducts(products)
      });
    }

    this.AddProduct.setValue(data);
  }

  handleExportData = () => {
    const { products } = this.props;
    const columns = this.ProductGrid
      .columnApi
      .getAllColumns()
      .map(({ colDef }) => colDef)
      .filter(({ headerName }) => headerName && headerName !== 'Actions');

    exportAsXlsx({ columns, data: products });
  }

  render() {
    const { isSaveProductModalOpen } = this.state;
    const { products, loading, total, pagination, categories, manufacturers, newProduct, editProduct } = this.props;
    const { pageNo, pageSize } = pagination || {};
    const { products: searchedProducts, loading: searchingProducts } = newProduct || {};
    const { comboProducts, loadingComboProducts } = editProduct || {};

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
            <Dropdown.Button
              overlay={(
                <Menu style={{ width: '140px' }}>
                  <Menu.Item
                    key="1"
                    icon={<ExportOutlined />}
                    onClick={this.handleExportData}>
                    Export
                  </Menu.Item>
                </Menu>
              )}
              key='4'
              type='primary'
              onClick={() => this.setState({ isSaveProductModalOpen: true })}>
              New Product
            </Dropdown.Button>
          ]}
        />
        <ProductGrid
          {...this.props}
          onClickEdit={this.handleEditProduct}
          ref={(ref) => this.ProductGrid = ref}
        />
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
          ref={(ref) => this.AddProduct = ref}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  ...products
});

export default connect(mapStateToProps, actions)(PageProduct);
