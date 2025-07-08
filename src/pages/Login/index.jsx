import React, { useEffect } from 'react'
import FormLogin from './FormLogin'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import iconLogo from '../../assets/images/logo/logo-min.png'
import LoadingPage from '../LoadingPage/index'

function Login() {
  const navigate = useNavigate()
  const token = Cookies.get('accessToken')
  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [])

  const renderLi = (text) => (
    <li className='flex items-center bg-gradient-to-r from-[#232526] to-[#414345] rounded-xl p-3 transition-all hover:from-[#232526]/80 hover:to-[#414345]/80 shadow-lg'>
      {/* <span className='rounded-full w-12 h-12 flex items-center justify-center mr-4 bg-gradient-to-tr from-[#FFD700] to-[#B8860B] shadow'>
        <img
          src={''}
          className='w-10 h-10 rounded-full border-2 border-white'
        />
      </span> */}
      <p className='font-medium text-gray-100'>{text}</p>
    </li>
  )

  return (
    !token && (
      <>
        <div className='bg-gradient-to-br from-[#232526] via-[#485563] to-[#232526] min-h-screen flex items-center justify-center p-4'>
          <div className='w-full max-w-5xl flex flex-col md:flex-row bg-white bg-opacity-5 rounded-3xl shadow-2xl overflow-hidden items-center border border-gray-200 backdrop-blur-md'>
            <motion.div
              className='w-full md:w-1/2 p-8 md:p-16 text-white'
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='mb-8'>
                <motion.h2
                  className='text-3xl md:text-4xl font-bold mb-2 text-[#FFD700] drop-shadow'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Welcome to
                </motion.h2>
                <motion.span
                  className='text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent drop-shadow'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Huỳnh Land
                </motion.span>
              </div>
              <motion.ul
                className='space-y-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {renderLi('Nền tảng quản trị bất động sản chuyên nghiệp')}
                {renderLi('Bảo mật & hiện đại')}
                {renderLi('Trải nghiệm người dùng cao cấp')}
              </motion.ul>
            </motion.div>
            <motion.div
              className='w-full md:w-1/2 p-8 md:p-16'
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='bg-white bg-opacity-90 rounded-3xl shadow-xl p-8 border border-gray-100'>
                <h2 className='text-3xl font-bold mb-6 text-gray-800 text-center font-custom'>
                  Đăng nhập
                </h2>
                <FormLogin />
              </div>
            </motion.div>
          </div>
        </div>
        <LoadingPage />
      </>
    )
  )
}

Login.propTypes = {}

export default Login
