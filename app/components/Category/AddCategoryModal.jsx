import React, { useState } from 'react';
import { Modal, Form, Input, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


const { TextArea } = Input;
const formItem = {
  style: {
    marginBottom: '5px'
  }
}

export default ({

}) => {
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload Image</div>
    </div>
  );

  return (
    <div>
      <Modal
        title='Add Category'
        visible={true}>
          <Upload
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}>
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
          <Form
            layout='vertical'
            colon={false}
            hideRequiredMark={true}>
            <Form.Item
              {...formItem}
              label='Name'
              name='name'
              required={true}>
              <Input
                placeholder='Enter name'
              />
            </Form.Item>
            <Form.Item
              {...formItem}
              label='Code'
              name='code'>
              <Input
                placeholder='Enter unique category code'
              />
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
