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

// Upload ảnh bất động sản, trả về { url }
export const uploadPropertyImage = async (file) => {
  const formData = new FormData()
  formData.append('image', file) // Đúng field là 'image'
  const response = await axios.post(
    `${API_URL}/property/upload-image`,
    formData,
    // Không cần headers, axios tự set
  )
  return response.data
}

// Có thể bổ sung các hàm khác như getProperty, updateProperty, deleteProperty nếu cần
