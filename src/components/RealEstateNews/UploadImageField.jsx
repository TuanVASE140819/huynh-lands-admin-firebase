import React, { useRef } from 'react'
import { Button, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios'

const UploadImageField = ({ value = [], onChange }) => {
  const fileList = (value || []).map((url, idx) => ({
    uid: idx,
    name: url.split('/').pop(),
    status: 'done',
    url,
  }))

  const handleChange = ({ fileList: newFileList }) => {
    // Lấy url từ response hoặc từ fileList
    const urls = newFileList
      .filter(
        (f) => f.status === 'done' && (f.url || (f.response && f.response.url)),
      )
      .map((f) => f.url || (f.response && f.response.url))
    onChange(urls)
  }

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData()
      formData.append('image', file)
      // Sử dụng đúng logic upload ảnh thực tế như ví dụ của bạn
      const res = await uploadHistoryImage(formData)
      onSuccess({ url: res.data.url })
    } catch (err) {
      message.error('Tải ảnh thất bại!')
      onError(err)
    }
  }

  return (
    <Upload
      listType='picture-card'
      fileList={fileList}
      customRequest={customRequest}
      onChange={handleChange}
      accept='image/*'
      multiple
      showUploadList={{ showRemoveIcon: true }}
    >
      {fileList.length >= 8 ? null : (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Tải ảnh</div>
        </div>
      )}
    </Upload>
  )
}

export default UploadImageField
