import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  Button,
  Spin,
  Tooltip,
  PageHeader,
  Pagination,
  Select,
  Icon,
  Input,
  Dropdown,
  Menu
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import moment from 'moment';

const { Group } = Input;
const { Option } = Select;

const PurchaseHistoryPage = props => {
  const columnDefs = [
    {
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      width: 50,
      pinned: 'left'
    },
    {
      headerName: 'Code',
      field: 'invoice',
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
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Group compact>
              <Tooltip title="Edit">
                <Button size="small" icon={<EditOutlined />} />
              </Tooltip>
              <Tooltip title="Delete">
                <Button size="small" icon={<DeleteOutlined />} />
              </Tooltip>
            </Group>
          </div>
        );
      }
    }
  ];

  const { saleHistory } = props;

  return (
    <div style={{ height: 'calc(100% - 95px)' }}>
      {/* Page Header */}
      <PageHeader
        style={{
          height: '53px',
          marginBottom: '10px',
          padding: '7px'
        }}
        title="Purchase History"
        extra={[
          <Input
            key="3"
            width={150}
            style={{ width: '150px', marginRight: '5px' }}
            placeholder="Search"
            allowClear
          />,
          <Dropdown.Button
            overlay={
              <Menu style={{ width: '140px' }}>
                <Menu.Item key="1">Export</Menu.Item>
              </Menu>
            }
            key="4"
            type="primary"
          >
            New Product
          </Dropdown.Button>
        ]}
      />

      <Spin spinning={false}>
        <div
          className="ag-theme-alpine"
          style={{ height: '100%', width: '100%' }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={[]}
            // animateRows={true}
          />
        </div>
      </Spin>

      {/* Footer */}
      <div style={{ padding: '5px 0px', float: 'right' }}>
        <Pagination
          showSizeChanger
          showQuickJumper
          total={10}
          pageSize={4}
          current={1}
          showTotal={(total, [start, end]) =>
            `Showing ${start} to ${end} of ${total}`
          }
        />
      </div>
    </div>
  );
};

export default PurchaseHistoryPage;
