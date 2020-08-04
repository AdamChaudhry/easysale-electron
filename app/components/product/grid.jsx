import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  Button,
  Input,
  Spin,
  Tooltip
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
        const { onClickEdit } = this.props;
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
                  onClick={() => onClickEdit({ data })}
                  icon={<EditOutlined />}
                />
              </Tooltip>
              <Tooltip title='Delete'>
                <Button
                  size="small"
                  icon={<DeleteOutlined />
                }/>
              </Tooltip>
            </Group>
          </div>
        );
      }
    }
  ];

  onGridReady = (params) => {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  render() {
    const { products, loading } = this.props;
    return (
        <Spin spinning={loading !== 0}>
          <div
            className="ag-theme-alpine"
            style={{ height: '100%', width: '100%' }}>
            <AgGridReact
              columnDefs={this.columnDefs}
              rowData={products}
              defaultColDef={{
                resizable: true
              }}
              animateRows={true}
              onGridReady={this.onGridReady}
            />
          </div>
        </Spin>
    );
  }
}


export default ProductGrid;
