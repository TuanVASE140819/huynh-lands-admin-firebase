import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

// Thêm bất động sản mới
export const createProperty = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/property`, data)
    return response.data
  } catch (error) {
    console.error('Failed to create property:', error)
    throw error
  }
}

// Có thể bổ sung các hàm khác như getProperty, updateProperty, deleteProperty nếu cần
