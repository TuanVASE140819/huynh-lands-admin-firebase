import React, { useEffect, useState } from 'react'
import { Table, Button, Input, Form, Row, Col } from 'antd'
import axiosInstance from '../../utils/axiosConfig'
import ModalCreate from './ModalCreate'

const columns = [
  {
    title: 'Hình ảnh',
    dataIndex: 'image',
    key: 'image',
    render: (img) => (
      <img src={img} alt='' style={{ width: 80, borderRadius: 8 }} />
    ),
  },
  {
    title: 'Tên BĐS',
    dataIndex: ['title', 'vi'],
    key: 'title',
  },
  {
    title: 'Địa chỉ',
    dataIndex: ['location', 'vi'],
    key: 'location',
  },
  {
    title: 'Loại',
    dataIndex: ['type', 'vi'],
    key: 'type',
  },
  {
    title: 'Diện tích',
    dataIndex: 'area',
    key: 'area',
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Hành động',
    key: 'action',
    render: (_, record) => <Button type='link'>Xem chi tiết</Button>,
  },
]

const defaultFilter = {
  type: '',
  location: '',
  minPrice: 0,
  maxPrice: 100000000000,
  keyword: '',
}

const RealEstateManagement = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState(defaultFilter)
  const [openModal, setOpenModal] = useState(false)

  const fetchData = async (params = {}) => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/properties/search', {
        params: {
          ...defaultFilter,
          ...params,
        },
      })
      setData(res.data)
    } catch (err) {
      setData([])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData(filter)
  }, [filter])

  const onFinish = (values) => {
    setFilter({ ...filter, ...values })
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
        <Form layout='vertical' onFinish={onFinish} initialValues={filter}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name='type' label='Loại BĐS'>
                <Input placeholder='Nhập loại BĐS' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='location' label='Địa chỉ'>
                <Input placeholder='Nhập địa chỉ' />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name='minPrice' label='Giá từ'>
                <Input type='number' min={0} placeholder='0' />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name='maxPrice' label='Giá đến'>
                <Input type='number' min={0} placeholder='Tối đa' />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name='keyword' label='Từ khóa'>
                <Input placeholder='Tìm theo tên, mô tả...' />
              </Form.Item>
            </Col>
          </Row>
          <Button type='primary' htmlType='submit'>
            Lọc
          </Button>
        </Form>
      </div>
      <div className='bg-white rounded-lg shadow p-4'>
        <h2 className='text-lg font-semibold mb-2'>Danh sách bất động sản</h2>
        <Table
          className='mt-4'
          dataSource={data.map((item) => ({ ...item, key: item.id }))}
          columns={columns}
          loading={loading}
          pagination={false}
        />
      </div>
      <ModalCreate
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onSuccess={() => fetchData(filter)}
      />
    </div>
  )
}

export default RealEstateManagement
