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

const PurchsePage = props => {
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
      headerName: 'Company',
      field: 'Description',
      width: 150,
      cellRenderer: ({ value }) => value || 'N/A'
    },
    {
      headerName: 'Supplier',
      field: 'Category.Name',
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    },
    {
      headerName: 'Storage Capacity',
      field: 'Manufacturer.Name',
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    },
    {
      headerName: 'Remaining Quantity',
      field: 'Type',
      width: 100
      // cellRenderer: ({ value }) => value || 'N/A'
    },
    {
      headerName: 'Order Quantity',
      field: 'MinQty',
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
    },
    {
      headerName: 'Receive Quantity',
      field: 'Stock.Qty',
      width: 100,
      cellRenderer: ({ value }) => value || 'N/A'
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
    <div style={{ height: 'calc(100% - 105px)' }}>
      {/* Page Header */}
      <PageHeader
        style={{
          height: '53px',
          marginBottom: '10px',
          padding: '7px'
        }}
        title="New Purchase"
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
            Add Item
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
            defaultColDef={{ resizable: true }}
            // animateRows={true}
          />
        </div>
      </Spin>

      {/* Footer */}

      <div
        style={{
          display: 'flex',
          marginTop: '10px',
          justifyContent: 'space-between'
        }}
      >
        {/* Total items */}
        <div>
          <h1>Total items: 3</h1>
        </div>

        {/* Pagination */}
        <div>
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
        <div>
          <Button
            style={{ float: 'right', margin: '0px 8px', width: '140px' }}
            type="primary"
          >
            Done
          </Button>
        </div>

        {/* <hr style={{ margin: '8px' }} /> */}
      </div>
    </div>
  );
};

export default PurchsePage;
