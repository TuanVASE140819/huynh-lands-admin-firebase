import * as Yup from 'yup'

export const addChamCongSchema = Yup.object().shape({
  congTy: Yup.number().required('error'),
  chiNhanh: Yup.number().required('error'),
  checkIn: Yup.string().required('error'),
  checkOut: Yup.string().required('error'),
})
