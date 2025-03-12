import axiosInstance from '../../utils/axiosConfig'

export const commonServices = {
  getAllCty: () => axiosInstance.get('CongTy/GetAllCongTy'),
  getAllCnByIdct: (idct) =>
    axiosInstance.get('ChiNhanh/GetChiNhanhByIDCT', {
      params: {
        idCT: idct,
      },
    }),
}
