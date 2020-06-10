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

class CategoryPage extends Component {
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

  render() {
    const { total, pagination } = this.props;
    const { pageNo, pageSize } = pagination || {};

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
              style={{ width: '150px', marginRight: '5px' }}
              placeholder="Search"
              allowClear
              onChange={(e) => {
                e.persist();
                this.handleSetKeyword(e);
              }}
            />
          ]}
        />
       <CategoryGrid {...this.props}/>
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
        <AddCategoryModal/>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  ...categories
});

export default connect(mapStateToProps, actions)(CategoryPage);
