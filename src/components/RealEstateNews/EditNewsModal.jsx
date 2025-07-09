import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, DatePicker, Spin, message } from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { fetchNewsDetail, updateNews } from '../../api/news'
import UploadImageField from './UploadImageField'
import dayjs from 'dayjs'

const EditNewsModal = ({ visible, onCancel, newsId, onUpdated }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    if (visible && newsId) {
      setFetching(true)
      fetchNewsDetail(newsId)
        .then((data) => {
          form.setFieldsValue({
            ...data,
            date: data.date ? dayjs(data.date) : null,
            images: data.images || [],
          })
        })
        .catch(() => message.error('Không thể tải dữ liệu chi tiết'))
        .finally(() => setFetching(false))
    }
  }, [visible, newsId, form])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      await updateNews(newsId, {
        ...values,
        date: values.date ? values.date.format('YYYY-MM-DD') : '',
        images: values.images || [],
      })
      setLoading(false)
      onUpdated()
      onCancel()
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={
        <span style={{ fontWeight: 700, fontSize: 20 }}>Chỉnh sửa tin tức</span>
      }
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      okText='Cập nhật'
      cancelText='Hủy'
      width={1200}
      bodyStyle={{ padding: 24, background: '#f9f9f9' }}
    >
      {fetching ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <Spin />
        </div>
      ) : (
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
                  style={{
                    minHeight: 340,
                    background: '#fff',
                    borderRadius: 6,
                  }}
                />
              </Form.Item>
            </div>
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
              <Form.Item
                name='images'
                label={<span style={{ fontWeight: 600 }}>Ảnh (nếu có)</span>}
                valuePropName='value'
              >
                <UploadImageField />
              </Form.Item>
            </div>
          </div>
        </Form>
      )}
    </Modal>
  )
}

export default EditNewsModal
