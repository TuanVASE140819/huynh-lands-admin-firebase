import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const fetchHistory = async (lang = 'vi') => {
  try {
    const response = await axios.get(`${API_URL}/history?lang=${lang}`)
    return response.data.history
  } catch (error) {
    console.error('Failed to fetch history:', error)
    throw error
  }
}

export const updateHistory = async (lang, data) => {
  try {
    const response = await axios.put(`${API_URL}/history?lang=${lang}`, data)
    return response.data
  } catch (error) {
    console.error('Failed to update history:', error)
    throw error
  }
}
