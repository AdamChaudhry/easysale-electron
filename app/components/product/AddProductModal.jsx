import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Form, Input, Upload, Select, InputNumber } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea, Group } = Input;
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

const AddProduct = ({
  onSubmit,
  onClose,
  ...rest
}, ref) => {
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { validateFields, resetFields, setFieldsValue } = form;

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload Image</div>
    </div>
  );


  useImperativeHandle(ref, () => ({
    setValue: ({ name, code, description }) => {
      setFieldsValue({ name, code, description });
    }
  })
  );


  const handleOnChangeFile = ({ file }) => {
    const { originFileObj } = file || {};

    const reader = new FileReader();
    reader.readAsDataURL(originFileObj);

    reader.onload = () => {
      setImageUrl(reader.result);
    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  const handleSubmit = () => {
    validateFields()
      .then(({ name, code, description }) =>
        onSubmit({ name, code, description, imageUrl, resetFields }))
      .catch(() => { });
  }

  return (
    <div>
      <Modal
        {...rest}
        onOk={handleSubmit}
        destroyOnClose={true}
        onCancel={() => {
          onClose();
          resetFields();
        }}>
        <Upload
          listType="picture-card"
          className="avatar-uploader"
          onChange={handleOnChangeFile}
          showUploadList={false}>
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <Form
          layout='vertical'
          colon={false}
          hideRequiredMark={true}
          form={form}>
          <Group compact>
            <Input
              value='Type'
              style={{ ...addonStyle, width: '60px' }}
              disabled
            />
            <Form.Item
              {...formItem}
              name='type'
              style={{ ...formItem.style, width: 'calc(100% - 60px)' }}
              rules={[{ required: true, message: 'Enter manufacturer name' }]}>
              <Select placeholder='Select Product type' />
            </Form.Item>
          </Group>
          <Form.Item
            {...formItem}
            name='name'
            rules={[{ required: true, message: 'Enter manufacturer name' }]}>
            <Input
              placeholder='Enter name'
              addonBefore='Name'
            />
          </Form.Item>
          <Form.Item
            {...formItem}
            name='code'>
            <Input
              placeholder='Enter a unique Product code'
              addonBefore='Code'
            />
          </Form.Item>
          <Group compact>
            <Input
              value='Category'
              style={{ ...addonStyle, width: '80px' }}
              disabled
            />
            <Form.Item
              {...formItem}
              name='type'
              style={{ ...formItem.style, width: 'calc(100% - 80px)' }}
              rules={[{ required: true, message: 'Enter manufacturer name' }]}>
              <Select placeholder='Select Category' />
            </Form.Item>
          </Group>
          <Group compact>
            <Input
              value='Manufacturer'
              style={{ ...addonStyle, width: '110px' }}
              disabled
            />
            <Form.Item
              {...formItem}
              name='type'
              style={{ ...formItem.style, width: 'calc(100% - 110px)' }}
              rules={[{ required: true, message: 'Enter manufacturer name' }]}>
              <Select placeholder='Select Manufacturer' />
            </Form.Item>
          </Group>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}>
            <div style={{ width: '45%' }}>
              <Group compact>
                <Input
                  value='Price'
                  style={{ ...addonStyle, width: '60px' }}
                  disabled
                />
                <Form.Item
                  {...formItem}
                  style={{ ...formItem.style, width: 'calc(100% - 60px)' }}
                  rules={[{ required: true, message: 'Enter Price' }]}>
                  <InputNumber placeholder='Enter Price' style={{ width: '100%' }} />
                </Form.Item>
              </Group>
            </div>
            <div style={{ width: '45%' }}>
              <Group compact>
                <Input
                  value='Cost'
                  style={{ ...addonStyle, width: '60px' }}
                  disabled
                />
                <Form.Item
                  {...formItem}
                  style={{ ...formItem.style, width: 'calc(100% - 60px)' }}
                  rules={[{ required: true, message: 'Enter Price' }]}>
                  <InputNumber placeholder='Enter Price' style={{ width: '100%' }} />
                </Form.Item>
              </Group>
            </div>
            <div style={{ width: '45%' }}>
              <Group compact>
                <Input
                  value='Minimun Qty.'
                  style={{ ...addonStyle, width: '110px' }}
                  disabled
                />
                <Form.Item
                  {...formItem}
                  style={{ ...formItem.style, width: 'calc(100% - 110px)' }}
                  rules={[{ required: true, message: 'Enter Price' }]}>
                  <InputNumber placeholder='Enter Price' style={{ width: '100%' }} />
                </Form.Item>
              </Group>
            </div>
          </div>
          <Form.Item
            {...formItem}
            label='Description'
            name='description'>
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default forwardRef(AddProduct);
