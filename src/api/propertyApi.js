import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const deleteProperty = async (id) => {
  return axios.delete(`${API_URL}/property/${id}`)
}

export const updatePropertyStatus = async (id, status) => {
  return axios.put(`${API_URL}/property/${id}/status`, { status })
}

export const getPropertyById = async (id) => {
  return axios.get(`${API_URL}/property/${id}`)
}

export const getProperties = async (params) => {
  return axios.get(`${API_URL}/property`, { params })
}
