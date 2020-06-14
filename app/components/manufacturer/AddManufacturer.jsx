import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Form, Input, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


const { TextArea } = Input;
const formItem = {
  style: {
    marginBottom: '5px'
  }
}

const AddManufacturer = ({
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
      .catch(() => {});
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
            <Form.Item
              {...formItem}
              label='Name'
              name='name'
              rules={[ { required: true, message: 'Enter manufacturer name' } ]}>
              <Input placeholder='Enter name'/>
            </Form.Item>
            <Form.Item
              {...formItem}
              label='Code'
              name='code'>
              <Input placeholder='Enter a unique manufacturer code' />
            </Form.Item>
            <Form.Item
              {...formItem}
              label='Description'
              name='description'>
              <TextArea/>
            </Form.Item>
          </Form>
      </Modal>
    </div>
  )
}

export default forwardRef(AddManufacturer);
