import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const fetchVision = async (lang = 'vi') => {
  try {
    const response = await axios.get(`${API_URL}/vision?lang=${lang}`)
    return response.data.vision
  } catch (error) {
    console.error('Failed to fetch vision:', error)
    throw error
  }
}

export const updateVision = async (lang, data) => {
  try {
    const response = await axios.put(`${API_URL}/vision?lang=${lang}`, data)
    return response.data
  } catch (error) {
    console.error('Failed to update vision:', error)
    throw error
  }
}
