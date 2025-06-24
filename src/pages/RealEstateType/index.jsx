import React, { useState } from 'react'
import { Input, Table, Button, Popconfirm, Tag } from 'antd'

const mockTypes = [
  {
    key: '1',
    name: 'Căn hộ',
    description: 'Loại căn hộ chung cư',
    status: 'active',
  },
  { key: '2', name: 'Nhà phố', description: 'Nhà mặt phố', status: 'inactive' },
  {
    key: '3',
    name: 'Biệt thự',
    description: 'Biệt thự cao cấp',
    status: 'active',
  },
]

const RealEstateType = () => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState(mockTypes)

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key))
  }

  const handleEdit = (key) => {
    // TODO: Hiện modal chỉnh sửa
    alert('Chức năng chỉnh sửa sẽ được bổ sung!')
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
          <Button type='primary'>Thêm loại mới</Button>
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

export default RealEstateType
