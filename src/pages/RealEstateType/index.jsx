import React, { useState, useEffect } from 'react'
import {
  Input,
  Table,
  Button,
  Popconfirm,
  Tag,
  message,
  Modal,
  Form,
  Checkbox,
} from 'antd'
import {
  getPropertyTypes,
  createPropertyType,
  updatePropertyType,
} from '../../api/propertyType'

const RealEstateType = () => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [isEdit, setIsEdit] = useState(false)
  const [editingKey, setEditingKey] = useState(null)

  useEffect(() => {
    const fetchTypes = async () => {
      setLoading(true)
      try {
        const json = await getPropertyTypes()

        console.log('Fetched property types:', json)
        // Ưu tiên lấy name/description từ vi, nếu không có thì lấy từ en hoặc ko
        const mapped = (json.propertyTypes || []).map((item) => {
          const name = item.vi?.name || item.en?.name || item.ko?.name || ''
          const description =
            item.vi?.description ||
            item.en?.description ||
            item.ko?.description ||
            ''
          return {
            key: item.id,
            name,
            description,
            status: item.status ? 'active' : 'inactive',
          }
        })
        setData(mapped)
      } catch (err) {
        message.error('Không thể tải danh sách loại bất động sản')
      } finally {
        setLoading(false)
      }
    }
    fetchTypes()
  }, [])

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key))
  }

  const handleEdit = (key) => {
    const record = data.find((item) => item.key === key)
    if (!record) return
    setIsEdit(true)
    setIsModalOpen(true)
    setEditingKey(key)
    // Lấy lại dữ liệu gốc từ API để fill form đầy đủ các ngôn ngữ
    getPropertyTypes().then((json) => {
      const found = (json.propertyTypes || []).find((item) => item.id === key)
      if (found) {
        form.setFieldsValue({
          vi: found.vi || {},
          en: found.en || {},
          ko: found.ko || {},
          status: found.status,
        })
      }
    })
  }

  const handleAddNew = () => {
    setIsEdit(false)
    setEditingKey(null)
    setIsModalOpen(true)
    form.resetFields()
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (isEdit && editingKey) {
        await updatePropertyType(editingKey, {
          vi: values.vi,
          en: values.en,
          ko: values.ko,
          status: values.status,
        })
        message.success('Cập nhật loại bất động sản thành công')
      } else {
        await createPropertyType({
          vi: values.vi,
          en: values.en,
          ko: values.ko,
          status: values.status,
        })
        message.success('Thêm loại bất động sản thành công')
      }
      setIsModalOpen(false)
      setIsEdit(false)
      setEditingKey(null)
      // Reload data
      const json = await getPropertyTypes()
      const mapped = (json.propertyTypes || []).map((item) => {
        const name = item.vi?.name || item.en?.name || item.ko?.name || ''
        const description =
          item.vi?.description ||
          item.en?.description ||
          item.ko?.description ||
          ''
        return {
          key: item.id,
          name,
          description,
          status: item.status ? 'active' : 'inactive',
        }
      })
      setData(mapped)
    } catch (err) {
      message.error(
        isEdit
          ? 'Cập nhật loại bất động sản thất bại'
          : 'Thêm loại bất động sản thất bại',
      )
    }
  }

  const handleModalCancel = () => {
    setIsModalOpen(false)
    setIsEdit(false)
    setEditingKey(null)
  }

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  )

  const columns = [
    {
      title: 'Tên loại',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className='font-semibold'>{text}</span>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) =>
        status === 'active' ? (
          <Tag color='green'>Hoạt động</Tag>
        ) : (
          <Tag color='red'>Ẩn</Tag>
        ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type='link' onClick={() => handleEdit(record.key)}>
            Sửa
          </Button>
          <Popconfirm
            title='Bạn chắc chắn muốn xóa?'
            onConfirm={() => handleDelete(record.key)}
            okText='Xóa'
            cancelText='Hủy'
          >
            <Button type='link' danger>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ]

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Quản lý Loại Bất động sản</h1>
      <div className='bg-white rounded shadow p-4 mb-4'>
        <div className='flex flex-col md:flex-row gap-3 md:items-center mb-4'>
          <Input
            placeholder='Tìm kiếm loại bất động sản...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full md:w-1/3'
            allowClear
          />
          <Button type='primary' onClick={handleAddNew}>
            Thêm loại mới
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          rowKey='key'
          loading={loading}
        />
      </div>
      <Modal
        title={isEdit ? 'Sửa loại bất động sản' : 'Thêm loại bất động sản'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={isEdit ? 'Cập nhật' : 'Thêm'}
        cancelText='Hủy'
        destroyOnClose
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            label='Tên loại (Tiếng Việt)'
            name={['vi', 'name']}
            rules={[
              { required: true, message: 'Vui lòng nhập tên loại (vi)!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Mô tả (Tiếng Việt)'
            name={['vi', 'description']}
            rules={[{ required: true, message: 'Vui lòng nhập mô tả (vi)!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Tên loại (English)'
            name={['en', 'name']}
            rules={[{ required: true, message: 'Please enter name (en)!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Description (English)'
            name={['en', 'description']}
            rules={[
              { required: true, message: 'Please enter description (en)!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Tên loại (Tiếng Hàn)'
            name={['ko', 'name']}
            rules={[
              { required: true, message: 'Vui lòng nhập tên loại (ko)!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Mô tả (Tiếng Hàn)'
            name={['ko', 'description']}
            rules={[{ required: true, message: 'Vui lòng nhập mô tả (ko)!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Trạng thái'
            name='status'
            valuePropName='checked'
            initialValue={true}
          >
            <Checkbox defaultChecked>Hoạt động</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default RealEstateType
