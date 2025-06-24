import axiosInstance from '../../utils/axiosConfig'

export const userServices = {
  // login: (payload) => axiosInstance.post('Auth/login', payload),
  login: (payload) => axiosInstance.post('Auth/login', payload),
  getIdNguoiDungByTenTk: (username) =>
    axiosInstance.get(`NguoiDung/id/${username}`),
  getInfoNguoiDungById: (idNguoiDung) =>
    axiosInstance.get('NguoiDung/GetNGuoiDungByID', {
      params: { idNguoiDung },
    }),
}
