import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const fetchMission = async (lang = 'vi') => {
  try {
    const response = await axios.get(`${API_URL}/mission?lang=${lang}`)
    return response.data.mission
  } catch (error) {
    console.error('Failed to fetch mission:', error)
    throw error
  }
}

export const updateMission = async (lang, data) => {
  try {
    const response = await axios.put(`${API_URL}/mission?lang=${lang}`, data)
    return response.data
  } catch (error) {
    console.error('Failed to update mission:', error)
    throw error
  }
}
