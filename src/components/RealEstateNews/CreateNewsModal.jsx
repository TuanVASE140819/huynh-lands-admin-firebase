import React, { useState } from 'react'
import { Modal, Form, Input, DatePicker, Row, Col, Upload, Image } from 'antd'
// import UploadImageField from './UploadImageField' // XÓA DÒNG NÀY
import { createNews } from '../../api/news'
import { uploadHistoryImage } from '../../api/historyApi' // THÊM DÒNG NÀY
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const CreateNewsModal = ({ visible, onCancel, onCreated }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  // State cho upload nhiều ảnh
  const [fileList, setFileList] = useState([])
  const [previewImage, setPreviewImage] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)

  // Xử lý xem trước ảnh
  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl)
    setPreviewOpen(true)
  }

  // Xử lý thay đổi fileList
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(
      newFileList.map((file) => {
        if (file.response && file.response.url) {
          return { ...file, url: file.response.url, status: 'done' }
        }
        if (file.url) return { ...file, status: 'done' }
        return file
      }),
    )
  }
  // Nút upload
  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>
        +<div style={{ color: '#1890ff', fontWeight: 600 }}>Tải lên</div>
      </div>
    </div>
  )

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      // Lấy url từ fileList (nếu đã upload lên server thì response sẽ có url)
      const images = fileList
        .filter((f) => f.status === 'done' && f.url)
        .map((f) => f.url)
      // DEBUG: Log images array before submit
      console.log('Images gửi lên:', images)
      await createNews({
        ...values,
        date: values.date ? values.date.format('YYYY-MM-DD') : '',
        images,
      })
      setLoading(false)
      setFileList([])
      setPreviewImage('')
      setPreviewOpen(false)
      form.resetFields()
      onCreated()
      onCancel()
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={
        <span style={{ fontWeight: 700, fontSize: 20 }}>Tạo tin tức mới</span>
      }
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      okText='Tạo'
      cancelText='Hủy'
      width={1200}
      bodyStyle={{ padding: 24, background: '#f9f9f9' }}
    >
      <Form form={form} layout='vertical'>
        <div
          style={{
            display: 'flex',
            gap: 32,
            alignItems: 'flex-start',
            flexWrap: 'nowrap',
            width: '100%',
            minHeight: 400,
          }}
        >
          {/* Left: Content only */}
          <div
            style={{
              flex: '1 1 0',
              minWidth: 0,
              maxWidth: '70%',
              background: '#fff',
              borderRadius: 8,
              padding: 16,
              boxShadow: '0 1px 4px #eee',
              overflow: 'auto',
            }}
          >
            <Form.Item
              name='content'
              label={<span style={{ fontWeight: 600 }}>Nội dung</span>}
              rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
            >
              <ReactQuill
                theme='snow'
                style={{ minHeight: 340, background: '#fff', borderRadius: 6 }}
              />
            </Form.Item>
          </div>
          {/* Right: Meta 30% */}
          <div
            style={{
              flex: '0 0 260px',
              minWidth: 240,
              maxWidth: 340,
              background: '#fff',
              borderRadius: 8,
              padding: 16,
              boxShadow: '0 1px 4px #eee',
            }}
          >
            <Form.Item
              name='title'
              label={<span style={{ fontWeight: 600 }}>Tiêu đề</span>}
              rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
            >
              <Input size='large' placeholder='Nhập tiêu đề bài viết...' />
            </Form.Item>
            <Form.Item
              name='summary'
              label={<span style={{ fontWeight: 600 }}>Tóm tắt</span>}
              rules={[{ required: true, message: 'Vui lòng nhập tóm tắt' }]}
            >
              <Input size='large' placeholder='Nhập tóm tắt ngắn...' />
            </Form.Item>
            <Form.Item
              name='author'
              label={<span style={{ fontWeight: 600 }}>Tác giả</span>}
              rules={[{ required: true, message: 'Vui lòng nhập tác giả' }]}
            >
              <Input size='large' placeholder='Tên tác giả...' />
            </Form.Item>
            <Form.Item
              name='date'
              label={<span style={{ fontWeight: 600 }}>Ngày tạo</span>}
              rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
            >
              <DatePicker className='w-full' size='large' />
            </Form.Item>
            {/* Upload nhiều ảnh kiểu Ant Design */}
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  label='Upload hình ảnh'
                  name='images'
                  valuePropName='fileList'
                  getValueFromEvent={(e) =>
                    Array.isArray(e) ? e : e && e.fileList
                  }
                >
                  <Upload
                    listType='picture-card'
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    customRequest={async ({ file, onSuccess, onError }) => {
                      try {
                        const formData = new FormData()
                        formData.append('image', file)
                        const res = await uploadHistoryImage(formData)
                        if (res && res.data && res.data.url) {
                          onSuccess({ url: res.data.url })
                        } else {
                          onError(
                            new Error('Không lấy được url ảnh từ response!'),
                          )
                        }
                      } catch (err) {
                        onError(err)
                      }
                    }}
                    accept='image/*'
                    multiple
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{ display: 'none' }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(''),
                      }}
                      src={previewImage}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>
      </Form>
    </Modal>
  )
}

export default CreateNewsModal
