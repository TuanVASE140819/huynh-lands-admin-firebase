import React, { useEffect } from 'react'
import FormLogin from './FormLogin'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
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
  const renderLi = (text) => {
    return (
      <li className='flex items-center bg-indigo-900 bg-opacity-50 rounded-full p-3 transition-all hover:bg-opacity-70'>
        <span className='rounded-full w-12 h-12 flex items-center justify-center mr-4'>
          <img src={iconLogo} className='w-12 h-12 rounded-full' />
        </span>
        <p className='font-medium'>{text}</p>
      </li>
    )
  }
  return (
    !token && (
      <>
        <div className='bg-gradient-to-r from-indigo-500 to-sky-500 min-h-screen flex items-center justify-center p-4'>
          <div className='w-full max-w-6xl flex flex-col md:flex-row bg-white bg-opacity-10 rounded-3xl shadow-2xl overflow-hidden items-center'>
            <motion.div
              className='w-full md:w-1/2 p-8 md:p-16 text-white'
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='mb-8'>
                <motion.h2
                  className='text-3xl md:text-4xl font-bold mb-2'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Welcome to
                </motion.h2>
                <motion.span
                  className='text-4xl md:text-5xl font-extrabold bg-clip-text '
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  TuanWebApp
                </motion.span>
              </div>
              <motion.ul
                className='space-y-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {renderLi('.........')}
              </motion.ul>
            </motion.div>
            <motion.div
              className='w-full md:w-1/2 p-8 md:p-16'
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='bg-white bg-opacity-90 rounded-3xl shadow-xl p-8'>
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
