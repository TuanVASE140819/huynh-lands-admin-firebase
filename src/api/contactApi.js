import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const fetchContact = async (lang = 'vi') => {
  try {
    const response = await axios.get(`${API_URL}/contact?lang=${lang}`)
    return response.data.contact
  } catch (error) {
    console.error('Failed to fetch contact:', error)
    throw error
  }
}

export const updateContact = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/contact`, data)
    return response.data
  } catch (error) {
    console.error('Failed to update contact:', error)
    throw error
  }
}
