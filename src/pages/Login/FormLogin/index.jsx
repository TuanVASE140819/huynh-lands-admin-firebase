import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Button, Input } from 'antd'
import { LockOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons'
// import ToastCus from '../../../components/common/Toast'
import { loginSchema } from '../../../schemas/login/loginSchemas'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../../redux/actions/userActions'

function FormLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (values, action) => {
    dispatch(loginUser(values, navigate, action))
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (value, action) => {
      handleSubmit(value, action)
    },
    validationSchema: loginSchema,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='text-left flex flex-col gap-4'>
        <div className='flex flex-col'>
          <label className='text-base text-left' htmlFor='email'>
            Email
          </label>
          <Input
            size='large'
            prefix={<UserOutlined />}
            name='email'
            placeholder='Nhập tài khoản'
            onChange={formik.handleChange}
            status={formik.errors.email && formik.touched.email ? 'error' : ''}
          />
          {formik.touched.email && formik.errors.email && (
            <span className='text-left text-red-500'>
              *{formik.errors.email}
            </span>
          )}
        </div>
        <div className='flex flex-col'>
          <label className='text-base text-left' htmlFor='password'>
            Mật khẩu
          </label>
          <Input.Password
            size='large'
            prefix={<LockOutlined />}
            name='password'
            placeholder='Nhập mật khẩu'
            onChange={formik.handleChange}
            status={
              formik.errors.password && formik.touched.password ? 'error' : ''
            }
          />
          {formik.touched.password && formik.errors.password && (
            <span className='text-left text-red-500'>
              *{formik.errors.password}
            </span>
          )}
        </div>
        <Button size='large' type='primary' htmlType='submit' className='mt-5'>
          Đăng nhập
        </Button>
      </div>
    </form>
  )
}

FormLogin.propTypes = {}

export default FormLogin
