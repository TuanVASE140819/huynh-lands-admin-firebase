import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('accessToken')
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken')
    console.log(config?.url)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default axiosInstance
