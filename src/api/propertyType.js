import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined in your environment variables.')
}

export const getPropertyTypes = async () => {
  // Đảm bảo endpoint đúng là `${API_URL}/api/property-type`
  const res = await axios.get(`${API_URL}/property-type`)
  return res.data
}

export const deletePropertyType = async (id) => {
  // Giả định API xóa là /api/property-type/:id
  return axios.delete(`${API_URL}/property-type/${id}`)
}

export const createPropertyType = async (data) => {
  // data: { vi, en, ko, status }
  // API expects: { vi: {...}, en: {...}, ko: {...}, status }
  const payload = {
    vi: data.vi,
    en: data.en,
    ko: data.ko,
    status: data.status,
  }
  const res = await axios.post(`${API_URL}/property-type`, payload)
  return res.data
}

export const updatePropertyType = async (id, data) => {
  // data: { vi, en, ko, status }
  // API expects: { vi: {...}, en: {...}, ko: {...}, status }
  const payload = {
    vi: data.vi,
    en: data.en,
    ko: data.ko,
    status: data.status,
  }
  return axios.put(`${API_URL}/property-type/${id}`, payload)
}
