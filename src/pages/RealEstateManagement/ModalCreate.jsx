import React from 'react'
import { Modal, Form, Input, Row, Col, Button, Tabs } from 'antd'
import axiosInstance from '../../utils/axiosConfig'

const ModalCreate = ({ open, onCancel, onSuccess }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = React.useState(false)
  const langTabs = [
    { key: 'vi', label: 'Tiếng Việt' },
    { key: 'en', label: 'English' },
    { key: 'ko', label: '한국어' },
  ]
  const [activeLang, setActiveLang] = React.useState('vi')

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      await axiosInstance.post('/properties', {
        ...values,
        title: {
          vi: values?.title?.vi || '',
          en: values?.title?.en || '',
          ko: values?.title?.ko || '',
        },
        location: {
          vi: values?.location?.vi || '',
          en: values?.location?.en || '',
          ko: values?.location?.ko || '',
        },
        type: {
          vi: values?.type?.vi || '',
          en: values?.type?.en || '',
          ko: values?.type?.ko || '',
        },
        description: {
          vi: values?.description?.vi || '',
          en: values?.description?.en || '',
          ko: values?.description?.ko || '',
        },
        direction: {
          vi: values?.direction?.vi || '',
          en: values?.direction?.en || '',
          ko: values?.direction?.ko || '',
        },
        features: {
          vi: values?.features?.vi
            ? values.features.vi
                .split(',')
                .map((i) => i.trim())
                .filter(Boolean)
            : [],
          en: values?.features?.en
            ? values.features.en
                .split(',')
                .map((i) => i.trim())
                .filter(Boolean)
            : [],
          ko: values?.features?.ko
            ? values.features.ko
                .split(',')
                .map((i) => i.trim())
                .filter(Boolean)
            : [],
        },
        priceUSD: '',
        priceKRW: '',
        bedrooms: values.bedrooms || 0,
        bathrooms: values.bathrooms || 0,
        image: values.image || '',
        area: values.area || '',
        price: values.price || '',
        floors: values.floors || 0,
      })
      form.resetFields()
      if (onSuccess) onSuccess()
      onCancel()
    } catch (e) {
      // Xử lý lỗi nếu cần
    }
    setLoading(false)
  }

  return (
    <Modal
      title='Thêm bất động sản mới'
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form layout='vertical' form={form} onFinish={handleSubmit}>
        <Tabs activeKey={activeLang} onChange={setActiveLang} className='mb-4'>
          {langTabs.map((tab) => (
            <Tabs.TabPane tab={tab.label} key={tab.key}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={['title', tab.key]}
                    label={`Tên BĐS (${tab.label})`}
                    rules={
                      tab.key === 'vi'
                        ? [{ required: true, message: 'Nhập tên BĐS' }]
                        : []
                    }
                  >
                    <Input
                      placeholder={`Nhập tên bất động sản (${tab.label})`}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['location', tab.key]}
                    label={`Địa chỉ (${tab.label})`}
                    rules={
                      tab.key === 'vi'
                        ? [{ required: true, message: 'Nhập địa chỉ' }]
                        : []
                    }
                  >
                    <Input placeholder={`Nhập địa chỉ (${tab.label})`} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name={['type', tab.key]}
                    label={`Loại (${tab.label})`}
                    rules={
                      tab.key === 'vi'
                        ? [{ required: true, message: 'Nhập loại' }]
                        : []
                    }
                  >
                    <Input placeholder={`Nhập loại (${tab.label})`} />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name={['description', tab.key]}
                    label={`Mô tả (${tab.label})`}
                  >
                    <Input.TextArea
                      rows={2}
                      placeholder={`Nhập mô tả (${tab.label})`}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name={['direction', tab.key]}
                label={`Hướng (${tab.label})`}
              >
                <Input placeholder={`Nhập hướng (${tab.label})`} />
              </Form.Item>
              <Form.Item
                name={['features', tab.key]}
                label={`Tiện ích (${tab.label})`}
              >
                <Input
                  placeholder={`Nhập tiện ích, cách nhau bởi dấu phẩy (${tab.label})`}
                />
              </Form.Item>
            </Tabs.TabPane>
          ))}
        </Tabs>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name='area' label='Diện tích'>
              <Input placeholder='VD: 150m²' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='price' label='Giá'>
              <Input placeholder='VD: 5.5 tỷ' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='image' label='Hình ảnh'>
              <Input placeholder='Link hình ảnh' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name='bedrooms' label='Số phòng ngủ'>
              <Input type='number' min={0} placeholder='0' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='bathrooms' label='Số phòng tắm'>
              <Input type='number' min={0} placeholder='0' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='floors' label='Số tầng'>
              <Input type='number' min={0} placeholder='0' />
            </Form.Item>
          </Col>
        </Row>
        <div className='flex justify-end'>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button type='primary' htmlType='submit' loading={loading}>
            Thêm mới
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default ModalCreate
