import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('Vui lòng nhập email của bạn'),
  password: Yup.string().required('Vui lòng nhập mật khẩu'),
})
