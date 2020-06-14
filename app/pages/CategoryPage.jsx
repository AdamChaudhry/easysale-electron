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

import * as actions from '../actions/category';
import CategoryGrid from '../components/Category/grid';
import AddCategoryModal from '../components/Category/AddCategoryModal';

const { Group } = Input;
const { Option } = Select;

const initialStats = {
  isCategoryModalOpen: false,
  isEditable: false,
  selectedRow: {}
}
class CategoryPage extends Component {
  state = {
    isCategoryModalOpen: false,
    isEditable: false,
    selectedRow: {}
  };

  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  handleSetKeyword = debounce(({ target: { value }}) => {
    const { SetFilter, getCategories, setPage } = this.props;
    SetFilter({
      key: 'keyword',
      value
    });

    setPage({ pageNo: 1 });
    getCategories();
  }, 500);

  handlePageChange = (pageNo) => {
    const { setPage, getCategories } = this.props;
    setPage({ pageNo });
    getCategories();
  }

  handlePageSizeChange = (pageNo, pageSize) => {
    const { setPageSize, getCategories, setPage } = this.props;
    setPageSize({ pageSize });
    setPage({ pageNo: 1 });
    getCategories();
  }

  handleSubmitCategory = ({ name, code, description, imageUrl, resetFields }) => {
    const { saveCategory, getCategories, updateCategory } = this.props;
    const { isEditable, selectedRow } = this.state;
    const { _id } = selectedRow || {};

    const handlePostChange = ({ isAdded }) => {
      if (!isAdded) return;
      resetFields();
      this.setDefaultState();
      getCategories();
    };

    isEditable
      ? updateCategory({ id: _id, name, code, description, imageUrl }).then(handlePostChange)
      : saveCategory({ name, code, description, imageUrl }).then(handlePostChange);
  }

  setDefaultState = () => {
    this.setState({
      isCategoryModalOpen: false,
      isEditable: false,
      selectedRow: {}
    });
  }

  handleEditCategory = ({ data }) => {
    const { Name, Code, Description } = data || {};

    this.setState({
      isCategoryModalOpen: true,
      isEditable: true,
      selectedRow: data
    });

    this.AddCategory.setValue({
      name: Name,
      code: Code,
      Description: Description
    });
  }

  render() {
    const { total, pagination } = this.props;
    const { pageNo, pageSize } = pagination || {};

    const { isCategoryModalOpen, isEditable, selectedRow } = this.state;
    const { Name, Code, Description } = selectedRow || {};

    return (
      <div style={{ height: 'calc(100% - 95px)'}}>
        <PageHeader
          style={{
            height: '53px',
            marginBottom: '10px',
            padding: '7px'
          }}
          title="Category"
          extra={[
            <Input
              key="1"
              width={200}
              style={{ width: '150px' }}
              placeholder="Search"
              allowClear
              onChange={(e) => {
                e.persist();
                this.handleSetKeyword(e);
              }}
            />,
            <Button
              key='2'
              type='primary'
              onClick={() => this.setState({ isCategoryModalOpen: true })}>
              Add Category
            </Button>
          ]}
        />
       <CategoryGrid
        {...this.props}
        onClickEdit={this.handleEditCategory}
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
        <AddCategoryModal
          title={isEditable ? 'Update Category' : 'Add Category'}
          okText={isEditable ? 'Update': 'Save' }
          visible={isCategoryModalOpen}
          onClose={() => this.setDefaultState()}
          onSubmit={this.handleSubmitCategory}
          ref={(ref) => this.AddCategory = ref}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  ...categories
});

export default connect(mapStateToProps, actions)(CategoryPage);
