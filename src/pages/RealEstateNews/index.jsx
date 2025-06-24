import React, { useState } from 'react'
import { Input, Select, Table, Button, Tag } from 'antd'

const { Option } = Select

const mockData = [
  {
    key: '1',
    title: 'Tin tức 1',
    main: true,
    views: 120,
    createdAt: '2025-06-20',
  },
  {
    key: '2',
    title: 'Tin tức 2',
    main: false,
    views: 80,
    createdAt: '2025-06-18',
  },
  {
    key: '3',
    title: 'Tin tức 3',
    main: true,
    views: 200,
    createdAt: '2025-06-15',
  },
]

const RealEstateNews = () => {
  const [search, setSearch] = useState('')
  const [mainFilter, setMainFilter] = useState('all')
  const [sort, setSort] = useState('newest')

  // Lọc dữ liệu theo filter
  const filteredData = mockData
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .filter((item) =>
      mainFilter === 'all'
        ? true
        : mainFilter === 'main'
          ? item.main
          : !item.main,
    )
    .sort((a, b) => {
      if (sort === 'newest')
        return new Date(b.createdAt) - new Date(a.createdAt)
      if (sort === 'oldest')
        return new Date(a.createdAt) - new Date(b.createdAt)
      if (sort === 'mostViewed') return b.views - a.views
      return 0
    })

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span className='font-semibold'>{text}</span>,
    },
    {
      title: 'Nội dung chính',
      dataIndex: 'main',
      key: 'main',
      render: (main) =>
        main ? <Tag color='blue'>Chính</Tag> : <Tag>Mặc định</Tag>,
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: () => <Button type='link'>Chỉnh sửa</Button>,
    },
  ]

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Quản lý Bản tin Bất động sản</h1>
      <div className='bg-white rounded shadow p-4 mb-4'>
        <div className='flex flex-col md:flex-row gap-3 md:items-center mb-4'>
          <Input
            placeholder='Tìm kiếm tin tức...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full md:w-1/3'
            allowClear
          />
          <Select
            value={mainFilter}
            onChange={setMainFilter}
            className='w-full md:w-1/4'
          >
            <Option value='all'>Tất cả nội dung</Option>
            <Option value='main'>Nội dung chính</Option>
            <Option value='other'>Nội dung khác</Option>
          </Select>
          <Select value={sort} onChange={setSort} className='w-full md:w-1/4'>
            <Option value='newest'>Mới nhất</Option>
            <Option value='oldest'>Cũ nhất</Option>
            <Option value='mostViewed'>Xem nhiều nhất</Option>
          </Select>
          <Button type='primary'>Thêm bản tin</Button>
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          rowKey='key'
        />
      </div>
    </div>
  )
}

export default RealEstateNews
