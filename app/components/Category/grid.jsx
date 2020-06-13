import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  Button,
  Input,
  Spin,
  Tooltip,
  Popconfirm
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Group } = Input;

class ProductGrid extends Component {

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
        const { deleteCategory, getCategories } = this.props;
        const { _id } = data;
        return (
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Group compact>
              <Tooltip title="Edit">
                <Button
                  size="small"
                  icon={<EditOutlined />}
                />
              </Tooltip>
              <Popconfirm
                title='Do you want to delete this category?'
                placement='left'
                onConfirm={() => deleteCategory({ id: _id }).then(() => getCategories())}
                okText='Delete'>
                <Tooltip title='Delete'>
                  <Button
                    size="small"
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>
              </Popconfirm>
            </Group>
          </div>
        );
      }
    }
  ];


  render() {
    const { categories, loading } = this.props;
    return (
        <Spin spinning={loading !== 0}>
          <div
            className="ag-theme-alpine"
            style={{ height: '100%', width: '100%' }}>
            <AgGridReact
              columnDefs={this.columnDefs}
              rowData={categories}
              animateRows={true}
            />
          </div>
        </Spin>
    );
  }
}


export default ProductGrid;
