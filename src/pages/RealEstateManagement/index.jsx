import React, { useEffect, useState } from 'react'
import {
  Table,
  Button,
  Input,
  Form,
  Row,
  Col,
  Tag,
  Select,
  Popconfirm,
  message,
} from 'antd'
import ModalCreate from './ModalCreate'
import ModalUpdate from './ModalUpdate'
import { getPropertyTypes } from '../../api/propertyType'
import { deleteProperty, updatePropertyStatus } from '../../api/propertyApi'
import { getPropertyById, getProperties } from '../../api/propertyApi'
import axios from 'axios'

// Cột hiển thị theo yêu cầu mới

const defaultFilter = {
  propertyType: '',
  address: '',
  priceFrom: '',
  priceTo: '',
  keyword: '',
}

const RealEstateManagement = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState(defaultFilter)
  const [openModal, setOpenModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [propertyTypes, setPropertyTypes] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [selectedData, setSelectedData] = useState(null)
  const [propertyTypeUrl, setPropertyTypeUrl] = useState('')
  const [businessType, setBusinessType] = useState('')
  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (text, record, index) => index + 1,
      width: 60,
      align: 'center',
    },
    {
      title: 'Mã code',
      dataIndex: ['vi', 'code'],
      key: 'code',
      render: (text, record) => record.vi?.code || '',
      width: 120,
    },
    {
      title: 'Tên BĐS',
      dataIndex: ['vi', 'name'],
      key: 'name',
      render: (text, record) => record.vi?.name || '',
      width: 200,
    },
    {
      title: 'Hoạt động BĐS',
      dataIndex: 'businessType',
      key: 'businessType',
      render: (text) =>
        text === 'rent'
          ? 'Thuê Bất Động Sản'
          : text === 'buy'
            ? 'Mua Bất Động Sản'
            : '',
      width: 150,
    },
    {
      title: 'Loại BĐS',
      dataIndex: 'propertyType',
      key: 'propertyType',
      render: (type, record) => {
        // Hiển thị tên loại từ danh sách propertyTypes nếu có
        const found = (record.propertyTypesList || []).find(
          (item) => item.value === type,
        )
        return found ? found.label : type || ''
      },
      width: 180,
    },
    {
      title: 'Địa chỉ',
      dataIndex: ['vi', 'address'],
      key: 'address',
      render: (text, record) => record.vi?.address || '',
      width: 200,
    },
    {
      title: 'Giá',
      dataIndex: ['vi', 'price'],
      key: 'price',
      render: (text, record) => record.vi?.price || '',
      width: 120,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Button
          size='small'
          type={status === 'active' ? 'primary' : 'default'}
          onClick={() => handleToggleStatus(record.id, status)}
        >
          {status === 'active' ? 'Đang hiển thị' : 'Đang ẩn'}
        </Button>
      ),
      width: 120,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => <Button type='link'>Xem chi tiết</Button>,
      width: 120,
    },
  ]
  useEffect(() => {
    // Lấy danh sách loại bất động sản cho bộ lọc
    getPropertyTypes().then((res) => {
      setPropertyTypes(
        (res.propertyTypes || []).map((item) => ({
          label: item.vi?.name || item.en?.name || item.ko?.name || item.id,
          value: item.id,
        })),
      )
    })
  }, [])

  // Khi lấy dữ liệu, truyền propertyTypesList vào từng record để render tên loại BĐS
  const fetchData = async (params = {}) => {
    setLoading(true)
    try {
      const query = {
        propertyType: params.propertyType || '',
        address: params.address || '',
        priceFrom: params.priceFrom || '',
        priceTo: params.priceTo || '',
        keyword: params.keyword || '',
        businessType: businessType || '',
      }
      if (propertyTypeUrl) {
        query.propertyType = propertyTypeUrl
      }
      const res = await getProperties(query)
      const propertyTypesList = propertyTypes
      setData(
        Array.isArray(res.data?.properties)
          ? res.data.properties.map((item) => ({
              ...item,
              propertyTypesList,
              key: item.id,
            }))
          : [],
      )
    } catch (err) {
      setData([])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData(filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const onFinish = (values) => {
    setFilter({ ...filter, ...values })
  }

  const handleShowDetail = async (id) => {
    setSelectedId(id)
    setOpenUpdateModal(true)
    try {
      const res = await getPropertyById(id)
      setSelectedData(res.data?.property || null)
    } catch {
      setSelectedData(null)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteProperty(id)
      message.success('Xóa bất động sản thành công')
      fetchData(filter)
    } catch {
      message.error('Xóa bất động sản thất bại')
    }
  }

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'hidden' : 'active'
      await updatePropertyStatus(id, newStatus)
      message.success('Cập nhật trạng thái thành công')
      fetchData(filter)
    } catch {
      message.error('Cập nhật trạng thái thất bại')
    }
  }

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Quản lý Bất động sản</h1>
        <Button type='primary' onClick={() => setOpenModal(true)}>
          Thêm bất động sản
        </Button>
      </div>
      <div className='bg-white rounded-lg shadow p-4 mb-6'>
        <h2 className='text-lg font-semibold mb-2'>Bộ lọc</h2>
        <Form layout='inline' onFinish={onFinish} initialValues={filter}>
          <Form.Item label='Hoạt động' style={{ minWidth: 180 }}>
            <Select
              placeholder='Chọn hoạt động'
              value={businessType}
              onChange={setBusinessType}
              allowClear
              options={[
                { label: 'Thuê Bất Động Sản', value: 'rent' },
                { label: 'Mua Bất Động Sản', value: 'buy' },
              ]}
              style={{ width: 160 }}
            />
          </Form.Item>
          <Form.Item
            name='propertyType'
            label='Loại BĐS'
            style={{ minWidth: 180 }}
          >
            <Select
              placeholder='Chọn loại BĐS'
              allowClear
              showSearch
              options={propertyTypes}
              style={{ width: 160 }}
            />
          </Form.Item>
          <Form.Item name='address' label='Địa chỉ' style={{ minWidth: 180 }}>
            <Input placeholder='Nhập địa chỉ' style={{ width: 140 }} />
          </Form.Item>
          <Form.Item name='priceFrom' label='Giá từ'>
            <Input
              type='number'
              min={0}
              placeholder='0'
              style={{ width: 90 }}
            />
          </Form.Item>
          <Form.Item name='priceTo' label='Giá đến'>
            <Input
              type='number'
              min={0}
              placeholder='Tối đa'
              style={{ width: 90 }}
            />
          </Form.Item>
          <Form.Item name='keyword' label='Từ khóa'>
            <Input
              placeholder='Tìm theo tên, mô tả...'
              style={{ width: 140 }}
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Lọc
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className='bg-white rounded-lg shadow p-4'>
        <h2 className='text-lg font-semibold mb-2'>Danh sách bất động sản</h2>
        <Table
          className='mt-4'
          dataSource={data}
          columns={columns.map((col) =>
            col.key === 'action'
              ? {
                  ...col,
                  render: (_, record) => (
                    <>
                      <Button
                        type='link'
                        onClick={() => handleShowDetail(record.id)}
                      >
                        Xem chi tiết
                      </Button>
                      <Popconfirm
                        title='Bạn chắc chắn muốn xóa bất động sản này?'
                        onConfirm={() => handleDelete(record.id)}
                        okText='Xóa'
                        cancelText='Hủy'
                      >
                        <Button type='link' danger>
                          Xóa
                        </Button>
                      </Popconfirm>
                    </>
                  ),
                }
              : col,
          )}
          loading={loading}
          pagination={false}
        />
      </div>
      <ModalCreate
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onSuccess={() => fetchData(filter)}
      />
      <ModalUpdate
        open={openUpdateModal}
        onCancel={() => {
          setOpenUpdateModal(false)
          setSelectedId(null)
          setSelectedData(null)
        }}
        data={selectedData}
        onSuccess={() => {
          fetchData(filter)
          setOpenUpdateModal(false)
          setSelectedId(null)
          setSelectedData(null)
        }}
      />
    </div>
  )
}

export default RealEstateManagement
