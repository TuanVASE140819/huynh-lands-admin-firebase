import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Row, Col, Button, Tabs, Select } from 'antd'
import { getPropertyTypes } from '../../api/propertyType'
import axios from 'axios'

const ModalUpdate = ({ open, onCancel, data, onSuccess }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [propertyTypes, setPropertyTypes] = useState([])
  const langTabs = [
    { key: 'vi', label: 'Tiếng Việt' },
    { key: 'en', label: 'English' },
    { key: 'ko', label: '한국어' },
  ]
  const [activeLang, setActiveLang] = useState('vi')

  useEffect(() => {
    getPropertyTypes().then((res) => {
      setPropertyTypes(
        (res.propertyTypes || []).map((item) => ({
          label: item.vi?.name || item.en?.name || item.ko?.name || item.id,
          value: item.id,
        })),
      )
    })
  }, [])

  // Chỉ setFieldsValue khi mở modal với id mới hoặc khi modal được mở lần đầu
  const prevIdRef = React.useRef(null)
  useEffect(() => {
    if (data && data.id !== prevIdRef.current && open) {
      prevIdRef.current = data.id
      form.setFieldsValue({
        propertyCode: data.vi?.code || '', // Mã bất động sản
        businessType: data.businessType || '', // Loại hình giao dịch
        propertyType: data.propertyType || undefined,
        image: data.images && data.images.length > 0 ? data.images[0] : '',
        area: data.vi?.area,
        price: data.vi?.price,
        bedrooms: data.vi?.bedrooms,
        bathrooms: data.vi?.bathrooms,
        floors: data.vi?.floors,
        hashtags: Array.isArray(data.vi?.hashtags)
          ? data.vi.hashtags.join(',')
          : '',
        direction: {
          vi: data.vi?.direction || '',
          en: data.en?.direction || '',
          ko: data.ko?.direction || '',
        },
        title: {
          vi: data.vi?.name,
          en: data.en?.name,
          ko: data.ko?.name,
        },
        location: {
          vi: data.vi?.address,
          en: data.en?.address,
          ko: data.ko?.address,
        },
        type: {
          vi: data.vi?.code,
          en: data.en?.code,
          ko: data.ko?.code,
        },
        description: {
          vi: data.vi?.description,
          en: data.en?.description,
          ko: data.ko?.description,
        },
        features: {
          vi: Array.isArray(data.vi?.extras) ? data.vi.extras.join(',') : '',
          en: Array.isArray(data.en?.extras) ? data.en.extras.join(',') : '',
          ko: Array.isArray(data.ko?.extras) ? data.ko.extras.join(',') : '',
        },
      })
    }
    // Không resetFields ở đây để tránh mất dữ liệu khi chuyển tab/ngôn ngữ
  }, [data, open])

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const langs = ['vi', 'en', 'ko']
      const property = {}
      langs.forEach((lang) => {
        property[lang] = {
          name:
            values?.title?.[lang] !== undefined
              ? values.title[lang]
              : data?.[lang]?.name || '',
          address:
            values?.location?.[lang] !== undefined
              ? values.location[lang]
              : data?.[lang]?.address || '',
          code:
            values.propertyCode !== undefined && values.propertyCode !== ''
              ? values.propertyCode
              : values?.type?.[lang] !== undefined
              ? values.type[lang]
              : data?.[lang]?.code || '',
          hashtags: values.hashtags
            ? values.hashtags
                .split(',')
                .map((i) => i.trim())
                .filter(Boolean)
            : values?.features?.[lang]
              ? values.features[lang]
                  .split(',')
                  .map((i) => i.trim())
                  .filter(Boolean)
              : data?.[lang]?.hashtags || [],
          price:
            values?.price !== undefined
              ? Number(values.price)
              : data?.[lang]?.price || 0,
          area:
            values?.area !== undefined
              ? Number(values.area)
              : data?.[lang]?.area || 0,
          landArea:
            values?.area !== undefined
              ? Number(values.area)
              : data?.[lang]?.landArea || 0,
          bedrooms:
            values?.bedrooms !== undefined
              ? Number(values.bedrooms)
              : data?.[lang]?.bedrooms || 0,
          bathrooms:
            values?.bathrooms !== undefined
              ? Number(values.bathrooms)
              : data?.[lang]?.bathrooms || 0,
          floors:
            values?.floors !== undefined
              ? Number(values.floors)
              : data?.[lang]?.floors || 0,
          direction:
            values?.direction?.[lang] !== undefined
              ? values.direction[lang]
              : data?.[lang]?.direction || '',
          description:
            values?.description?.[lang] !== undefined
              ? values.description[lang]
              : data?.[lang]?.description || '',
          highlights: values?.features?.[lang]
            ? values.features[lang]
                .split(',')
                .map((i) => i.trim())
                .filter(Boolean)
            : data?.[lang]?.highlights || [],
          extras: values?.features?.[lang]
            ? values.features[lang]
                .split(',')
                .map((i) => i.trim())
                .filter(Boolean)
            : data?.[lang]?.extras || [],
          mapLocation: data?.[lang]?.mapLocation || { lat: 0, lng: 0 },
        }
      })
      await axios.put(`http://localhost:8011/api/property/${data.id}`, {
        ...property,
        images: values.image ? [values.image] : data.images || [],
        propertyType: values.propertyType || data.propertyType || null,
        businessType: values.businessType || data.businessType || null,
      })
      if (onSuccess) onSuccess()
    } catch (e) {
      // Xử lý lỗi nếu cần
    }
    setLoading(false)
  }

  return (
    <Modal
      title='Cập nhật bất động sản'
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      width={900}
    >
      <Form layout='vertical' form={form} onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name='propertyCode'
              label='Mã bất động sản'
              rules={[{ required: true, message: 'Nhập mã bất động sản' }]
              }
            >
              <Input placeholder='Nhập mã bất động sản' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name='propertyType'
              label='Loại bất động sản'
              rules={[{ required: true, message: 'Chọn loại bất động sản' }]}
            >
              <Select
                placeholder='Chọn loại bất động sản'
                allowClear
                showSearch
                options={propertyTypes}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name='businessType'
              label='Loại hình giao dịch'
              rules={[{ required: true, message: 'Chọn loại hình giao dịch' }]}
            >
              <Select
                placeholder='Chọn loại hình giao dịch'
                allowClear
                options={[
                  { label: 'Thuê Bất Động Sản', value: 'rent' },
                  { label: 'Mua Bất Động Sản', value: 'buy' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='hashtags' label='Hashtag (cách nhau bởi dấu phẩy)'>
              <Input placeholder='VD: sang trọng, trung tâm, view đẹp' />
            </Form.Item>
          </Col>
        </Row>
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
                <Col span={8}>
                  <Form.Item
                    name={['direction', tab.key]}
                    label={`Hướng (${tab.label})`}
                  >
                    <Input placeholder={`Nhập hướng (${tab.label})`} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={['features', tab.key]}
                    label={`Tiện ích (${tab.label})`}
                  >
                    <Input
                      placeholder={`Nhập tiện ích, cách nhau bởi dấu phẩy (${tab.label})`}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name={['description', tab.key]}
                label={`Mô tả (${tab.label})`}
              >
                <Input.TextArea
                  rows={2}
                  placeholder={`Nhập mô tả (${tab.label})`}
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
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

// Thêm kiểm tra prop types cho ModalUpdate
ModalUpdate.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    propertyType: PropTypes.string,
    images: PropTypes.array,
    vi: PropTypes.object,
    en: PropTypes.object,
    ko: PropTypes.object,
  }),
  onSuccess: PropTypes.func,
}

export default ModalUpdate
