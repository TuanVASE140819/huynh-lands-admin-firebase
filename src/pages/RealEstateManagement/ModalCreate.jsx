import React from 'react'
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  Button,
  Tabs,
  Select,
  Upload,
  Image,
  notification,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { createProperty, uploadPropertyImage } from '../../api/properties'
import { getPropertyTypes } from '../../api/propertyType'

const ModalCreate = ({ open, onCancel, onSuccess }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = React.useState(false)
  const [propertyTypes, setPropertyTypes] = React.useState([])
  const [businessType, setBusinessType] = React.useState('')
  const [fileList, setFileList] = React.useState([])
  const [previewOpen, setPreviewOpen] = React.useState(false)
  const [previewImage, setPreviewImage] = React.useState('')

  const langTabs = [
    { key: 'vi', label: 'Tiếng Việt' },
    { key: 'en', label: 'English' },
    { key: 'ko', label: '한국어' },
  ]
  const [activeLang, setActiveLang] = React.useState('vi')

  React.useEffect(() => {
    // Lấy danh sách loại bất động sản
    getPropertyTypes().then((res) => {
      setPropertyTypes(
        (res.propertyTypes || []).map((item) => ({
          label: item.vi?.name || item.en?.name || item.ko?.name || item.id,
          value: item.id,
          vi: item.vi?.name || '',
          en: item.en?.name || '',
          ko: item.ko?.name || '',
        })),
      )
    })
  }, [])

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new window.FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  // Hàm upload file lên backend, trả về URL Dropbox
  const uploadImageToServer = async (file) => {
    const data = await uploadPropertyImage(file)
    return data.url // backend trả về { url: 'https://...' }
  }

  // Xử lý khi chọn/chỉnh sửa file ảnh (chỉ review, không upload)
  const handleChange = ({ fileList: newFileList }) => {
    setFileList([...newFileList])
  }

  // Hàm kiểm tra các trường bắt buộc cho từng ngôn ngữ
  const validateRequiredLangFields = (values) => {
    const langs = ['vi', 'en', 'ko']
    const requiredFields = ['title', 'location'] // loại bỏ 'type'
    let missing = []
    langs.forEach((lang) => {
      requiredFields.forEach((field) => {
        if (!values?.[field]?.[lang] || values[field][lang].trim() === '') {
          missing.push(`${field} (${lang})`)
        }
      })
    })
    return missing
  }

  const handleSubmit = async (values) => {
    const missingFields = validateRequiredLangFields(values)
    if (missingFields.length > 0) {
      notification.warning({
        message: 'Thiếu thông tin',
        description: `Vui lòng nhập đầy đủ các trường: ${missingFields.join(', ')}`,
        duration: 4,
      })
      return
    }
    setLoading(true)
    try {
      // Upload tất cả ảnh chưa có url
      const uploadedFileList = await Promise.all(
        fileList.map(async (file) => {
          if (!file.url && file.originFileObj) {
            try {
              const data = await uploadPropertyImage(file.originFileObj)
              return { ...file, url: data.url }
            } catch (e) {
              file.status = 'error'
              return file
            }
          }
          return file
        }),
      )
      const langs = ['vi', 'en', 'ko']
      const property = {}
      // Lấy tên loại bất động sản theo từng ngôn ngữ
      const selectedType = propertyTypes.find(pt => pt.value === values.propertyType)
      langs.forEach((lang) => {
        property[lang] = {
          name: values?.title?.[lang] || '',
          address: values?.location?.[lang] || '',
          code: values.propertyCode || '',
          hashtags: values?.features?.[lang]
            ? values.features[lang]
                .split(',')
                .map((i) => i.trim())
                .filter(Boolean)
            : [],
          price: Number(values?.price) || 0,
          area: Number(values?.area) || 0,
          landArea: Number(values?.area) || 0,
          bedrooms: Number(values?.bedrooms) || 0,
          bathrooms: Number(values?.bathrooms) || 0,
          floors: Number(values?.floors) || 0,
          direction: values?.direction?.[lang] || '',
          description: values?.description?.[lang] || '',
          highlights: values?.features?.[lang]
            ? values.features[lang]
                .split(',')
                .map((i) => i.trim())
                .filter(Boolean)
            : [],
          extras: values?.features?.[lang]
            ? values.features[lang]
                .split(',')
                .map((i) => i.trim())
                .filter(Boolean)
            : [],
          mapLocation: { lat: 0, lng: 0 },
          // XÓA propertyType khỏi từng lang
        }
      })
      // Lấy các url ảnh đã upload
      const imageUrls = uploadedFileList.filter((f) => f.url).map((f) => f.url)
      // Gọi API qua hàm createProperty
      await createProperty({
        ...property,
        images: imageUrls,
        propertyType: selectedType ? selectedType[activeLang] : '', // truyền tên loại theo ngôn ngữ đang chọn
        businessType: values.businessType || businessType || null,
      })
      form.resetFields()
      setFileList([])
      if (onSuccess) onSuccess()
      onCancel()
    } catch (e) {
      // Xử lý lỗi nếu cần
    }
    setLoading(false)
  }

  // Đặt lại uploadButton ở đúng vị trí
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <Modal
      title='Thêm bất động sản mới'
      open={open}
      onCancel={onCancel}
      footer={null}
      width={900}
    >
      <Form layout='vertical' form={form} onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name='propertyCode'
              label='Mã bất động sản'
              rules={[{ required: true, message: 'Nhập mã bất động sản' }]}
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
                value={businessType}
                onChange={setBusinessType}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={['hashtags']}
              label='Hashtag (cách nhau bởi dấu phẩy)'
            >
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
                    rules={[
                      { required: true, message: `Nhập tên BĐS (${tab.label})` }
                    ]}
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
                    rules={[
                      { required: true, message: `Nhập địa chỉ (${tab.label})` }
                    ]}
                  >
                    <Input placeholder={`Nhập địa chỉ (${tab.label})`} />
                  </Form.Item>
                </Col>
              </Row>
              {/* Đã loại bỏ trường Loại */}
              <Row gutter={16}>
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
        <Row gutter={24}>
          <Col span={7}>
            <Form.Item label='Upload hình ảnh'>
              <Upload
                listType='picture-card'
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false}
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
          <Col span={17}>
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
