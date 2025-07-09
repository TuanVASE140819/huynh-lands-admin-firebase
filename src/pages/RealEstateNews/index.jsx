import React, { useState, useEffect } from 'react'
import {
  Input,
  Select,
  Table,
  Button,
  Tag,
  message,
  Modal,
  Form,
  DatePicker,
} from 'antd'
import { fetchNews, createNews } from '../../api/news'

const { Option } = Select

import CreateNewsModal from '../../components/RealEstateNews/CreateNewsModal'
import EditNewsModal from '../../components/RealEstateNews/EditNewsModal'
import { render } from 'react-dom'

const API_URL = import.meta.env.VITE_API_URL

const RealEstateNews = () => {
  const [search, setSearch] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [mainFilter, setMainFilter] = useState('all')
  const [sort, setSort] = useState('newest')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  // State và handler cho modal tạo tin tức
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editId, setEditId] = useState(null)

  // Hàm fetch lại danh sách tin tức
  const fetchAllNews = async () => {
    setLoading(true)
    try {
      const news = await fetchNews(search)
      setData(news)
    } catch (err) {
      message.error('Không thể tải dữ liệu bản tin')
    }
    setLoading(false)
  }

  const handleNewsCreated = () => {
    setShowCreateModal(false)
    fetchAllNews()
  }
  const handleNewsUpdated = () => {
    setShowEditModal(false)
    fetchAllNews()
  }

  useEffect(() => {
    // Load dữ liệu ban đầu
    const getNews = async () => {
      setLoading(true)
      try {
        const news = await fetchNews('')
        setData(news)
      } catch (err) {
        message.error('Không thể tải dữ liệu bản tin')
      }
      setLoading(false)
    }
    getNews()
  }, [])

  useEffect(() => {
    const getNews = async () => {
      setLoading(true)
      try {
        const news = await fetchNews(search)
        setData(news)
      } catch (err) {
        message.error('Không thể tải dữ liệu bản tin')
      }
      setLoading(false)
    }
    getNews()
  }, [search])

  // Lọc dữ liệu theo filter
  const filteredData = data
    .filter((item) =>
      mainFilter === 'all'
        ? true
        : mainFilter === 'main'
          ? item.summary?.toLowerCase().includes('chính')
          : !item.summary?.toLowerCase().includes('chính'),
    )
    .sort((a, b) => {
      if (sort === 'newest') return new Date(b.date) - new Date(a.date)
      if (sort === 'oldest') return new Date(a.date) - new Date(b.date)
      if (sort === 'mostViewed') return (b.views || 0) - (a.views || 0)
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
      title: 'Tóm tắt',
      dataIndex: 'summary',
      key: 'summary',
      render: (text) => <span className='text-gray-600'>{text}</span>,
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 160,
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <Button
            type='primary'
            ghost
            size='small'
            onClick={() => {
              setEditId(record.id)
              setShowEditModal(true)
            }}
          >
            Chỉnh sửa
          </Button>
          <Button
            type='primary'
            danger
            size='small'
            onClick={() => {
              Modal.confirm({
                title: 'Xác nhận xoá tin tức',
                content: 'Bạn có chắc muốn xoá tin tức này?',
                okText: 'Xoá',
                okType: 'danger',
                cancelText: 'Huỷ',
                onOk: async () => {
                  try {
                    await fetch(`${API_URL}/news/${record.id}`, {
                      method: 'DELETE',
                    })
                    message.success('Đã xoá tin tức!')
                    fetchAllNews()
                  } catch {
                    message.error('Xoá thất bại!')
                  }
                },
              })
            }}
          >
            Xoá
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Quản lý Bản tin Bất động sản</h1>
      <div className='bg-white rounded shadow p-4 mb-4'>
        <div className='flex flex-col md:flex-row gap-3 md:items-center mb-4'>
          <Input
            placeholder='Tìm kiếm tin tức...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='w-full md:w-1/3'
            allowClear
          />
          <Button type='primary' onClick={() => setSearch(inputValue)}>
            Tìm kiếm
          </Button>
          <Button type='primary' onClick={() => setShowCreateModal(true)}>
            Tạo tin tức
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={{ pageSize: 5 }}
          rowKey='id'
        />
      </div>
      {/* Modal tạo tin tức */}
      {showCreateModal && (
        <CreateNewsModal
          visible={showCreateModal}
          onCancel={() => setShowCreateModal(false)}
          onCreated={handleNewsCreated}
        />
      )}
      {/* Modal chỉnh sửa tin tức */}
      {showEditModal && editId && (
        <EditNewsModal
          visible={showEditModal}
          newsId={editId}
          onCancel={() => setShowEditModal(false)}
          onUpdated={handleNewsUpdated}
        />
      )}
    </div>
  )
}

export default RealEstateNews
