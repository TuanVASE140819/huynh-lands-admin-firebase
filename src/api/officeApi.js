import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const fetchOffice = async (lang = 'vi') => {
  try {
    const response = await axios.get(`${API_URL}/office?lang=${lang}`)
    return response.data.office
  } catch (error) {
    console.error('Failed to fetch office:', error)
    throw error
  }
}

export const updateOffice = async (lang, data) => {
  try {
    const response = await axios.put(`${API_URL}/office?lang=${lang}`, data)
    return response.data
  } catch (error) {
    console.error('Failed to update office:', error)
    throw error
  }
}
