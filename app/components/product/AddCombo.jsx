import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Form, Input, Upload, Select, InputNumber, Divider, Spin, AutoComplete, Button, Table, Tooltip } from 'antd';
import { LoadingOutlined, PlusOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { findIndex } from 'lodash';

import { PRODUCT_TYPE } from '../../config/constants.json';

const { TextArea, Group, Search } = Input;
const { Option } = Select;

const formItem = {
  style: {
    marginBottom: '10px'
  }
}

const addonStyle = {
  backgroundColor: '#fafafa',
  color: 'rgba(0, 0, 0, 0.65)',
  cursor: 'default'
}

const ComboProductForm = ({
  onChangeSearch,
  searchedProducts = [],
  searchingProducts = false
}, ref) => {
  const searchOptions = searchedProducts.map(({ Name, _id }) => <Option key={_id} value={_id}>{Name}</Option>);

  const [searchProduct, setSearchProduct] = useState();
  const [comboQty, setComboQty] = useState();
  const [comboProducts, setComboProducts] = useState([]);

  const handleRemoveCombo = ({ id }) => {
    const products = comboProducts.filter(({ _id }) => _id != id);
    setComboProducts(products);
  }

  const handleOnChangeQty = ({ qty, id }) => {
    const index = findIndex(comboProducts, ({ _id }) => _id == id);
    comboProducts[index].comboQty  = qty;
    setComboProducts([ ...comboProducts ]);
  }

  useImperativeHandle(ref, () => ({
    getComboProducts: () => comboProducts
  }));

  const columns = [
    {
      title: 'Code',
      dataIndex: 'Code',
      key: 'Code',
      width: 70,
      render: (text) => text || 'N/A'
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name'
    },
    {
      title: 'Qty',
      dataIndex: 'comboQty',
      key: 'Qty',
      width: 100,
      align: 'center',
      render: (text, record) => {
        const { _id } = record;
        return (
          <InputNumber
            onChange={(qty) => handleOnChangeQty({ qty, id: _id })}
            value={text}
            min={1}
          />
        )
      }
    },
    {
      title: 'Actions',
      width: 100,
      align: 'center',
      render: (text, record) => {
        return (
          <div>
            <Tooltip
              title='Remove'
              placement='left'>
              <Button
                type='dashed'
                size='small'
                onClick={() => handleRemoveCombo({ id: record._id })}
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </div>
        )
      }
    }
  ];


  const handleAddToCombo = () => {
    const product = searchedProducts.find(({ _id }) => _id == searchProduct);
    if (!product || !comboQty) return;

    const index = findIndex(comboProducts, ({ _id }) => _id == searchProduct);
    if (index == -1) {
      const { Name, Code, _id } = product;
      setComboProducts([
        ...comboProducts,
        {
          Name,
          Code,
          _id,
          comboQty
        }
      ]);
    } else {
      comboProducts[index].comboQty += comboQty;
      setComboProducts([ ...comboProducts ]);
    }

    setSearchProduct(null);
    setComboQty(null);
  }

  return (
    <>
      <Divider />
      <div style={{ textAlign: "center" }}>Combo Products</div>
      <Group compact>
        <Input
          value='Search'
          style={{ ...addonStyle, width: '80px' }}
          disabled
        />
        <Select
          showSearch
          showArrow={false}
          placeholder="Select Products"
          loading={searchingProducts}
          filterOption={false}
          onSearch={onChangeSearch}
          onChange={(product) => setSearchProduct(product)}
          value={searchProduct}
          style={{ width: 'calc(100% - 100px - 60px - 80px)' }}>
          {searchOptions}
        </Select>
        <InputNumber
          placeholder='Enter Qty'
          style={{ width: '100px' }}
          onChange={(qty) => setComboQty(qty)}
          value={comboQty}
          onPressEnter={handleAddToCombo}
        />
        <Button
          style={{ width: '60px' }}
          onClick={handleAddToCombo}
          type='primary'>
          Add
        </Button>
      </Group>
      <Table
        style={{ marginTop: '10px', height: '165px' }}
        columns={columns}
        dataSource={comboProducts}
        rowKey={({ _id }) => _id}
        size='small'
        pagination={false}
        scroll={{ y: 150 }}
      />
    </>
  );
}

export default forwardRef(ComboProductForm);
