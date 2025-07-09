// ...existing code...
// Lấy chi tiết tin tức theo id
export const fetchNewsDetail = async (id) => {
  const response = await axios.get(`${API_URL}/news/${id}`)
  return response.data
}

// Cập nhật tin tức
export const updateNews = async (id, data) => {
  const response = await axios.put(`${API_URL}/news/${id}`, data)
  return response.data
}
export const createNews = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/news`, data)
    return response.data
  } catch (error) {
    console.error('Failed to create news:', error)
    throw error
  }
}
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const fetchNews = async (title = '') => {
  try {
    const response = await axios.get(
      `${API_URL}/news?title=${encodeURIComponent(title)}`,
    )
    return response.data.news || []
  } catch (error) {
    console.error('Failed to fetch news:', error)
    throw error
  }
}
