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

import * as actions from '../actions/manufacturer';
import ManufacturerGrid from '../components/manufacturer/grid';
import AddManufacturer from '../components/manufacturer/AddManufacturer';

const { Group } = Input;
const { Option } = Select;

const initialStats = {
  isManufacturerModalOpen: false,
  isEditable: false,
  selectedRow: {}
}

class ManufacturerPage extends Component {
  state = { ...initialStats };

  componentDidMount() {
    const { getManufacturers } = this.props;
    getManufacturers();
  }

  handleSetKeyword = debounce(({ target: { value }}) => {
    const { SetFilter, getManufacturers, setPage } = this.props;
    SetFilter({
      key: 'keyword',
      value
    });

    setPage({ pageNo: 1 });
    getManufacturers();
  }, 500);

  handlePageChange = (pageNo) => {
    const { setPage, getManufacturers } = this.props;
    setPage({ pageNo });
    getManufacturers();
  }

  handlePageSizeChange = (pageNo, pageSize) => {
    const { setPageSize, getManufacturers, setPage } = this.props;
    setPageSize({ pageSize });
    setPage({ pageNo: 1 });
    getManufacturers();
  }

  handleSubmitManufacturer = ({ name, code, description, imageUrl, resetFields }) => {
    const { saveManufacturer, getManufacturers, updateManufacturer } = this.props;
    const { isEditable, selectedRow } = this.state;
    const { _id } = selectedRow || {};

    const handlePostChange = ({ isAdded }) => {
      if (!isAdded) return;
      resetFields();
      this.setState({ ...initialStats });
      getManufacturers();
    };

    isEditable
      ? updateManufacturer({ id: _id, name, code, description, imageUrl }).then(handlePostChange)
      : saveManufacturer({ name, code, description, imageUrl }).then(handlePostChange);
  }

  handleEditManufacturer = ({ data }) => {
    this.setState({
      isManufacturerModalOpen: true,
      isEditable: true,
      selectedRow: data
    });
  }

  render() {
    const { total, pagination } = this.props;
    const { pageNo, pageSize } = pagination || {};

    const { isManufacturerModalOpen, isEditable, selectedRow } = this.state;
    const { Name, Code, Description } = selectedRow || {};

    return (
      <div style={{ height: 'calc(100% - 95px)'}}>
        <PageHeader
          style={{
            height: '53px',
            marginBottom: '10px',
            padding: '7px'
          }}
          title="Manufacturer"
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
              onClick={() => this.setState({ isManufacturerModalOpen: true })}>
              Add Manufacturer
            </Button>
          ]}
        />
       <ManufacturerGrid
        {...this.props}
        onClickEdit={this.handleEditManufacturer}
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
        <AddManufacturer
          title={isEditable ? 'Update Manufacturer' : 'Add Manufacturer'}
          okText={isEditable ? 'Update': 'Save' }
          visible={isManufacturerModalOpen}
          name={Name}
          code={Code}
          description={Description}
          onClose={() => this.setState({ ...initialStats })}
          onSubmit={this.handleSubmitManufacturer}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ manufacturers }) => ({
  ...manufacturers
});

export default connect(mapStateToProps, actions)(ManufacturerPage);
