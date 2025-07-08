import React from 'react'
import srcLogo from '../../assets/images/logo/logo.png'

const Dashboard = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232526] via-[#485563] to-[#232526]'>
      <div className='w-full max-w-3xl bg-white bg-opacity-10 rounded-3xl shadow-2xl flex flex-col items-center p-12 border border-gray-200 backdrop-blur-md'>
        <div className='flex justify-center mb-8'>
          <img
            src={srcLogo}
            className='w-48 h-48 rounded-full shadow-lg border-4 border-[#FFD700] bg-white bg-opacity-80'
            alt='logo'
          />
        </div>
        <div className='flex flex-col items-center text-center'>
          <h1 className='text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent drop-shadow mb-2'>
            TuanWebApp
          </h1>
          <p className='text-lg md:text-2xl text-gray-100 font-medium mb-4'>
            Nền tảng quản trị bất động sản chuyên nghiệp
          </p>
          <div className='flex flex-col gap-2 mt-4'>
            <span className='text-base text-gray-200'>
              Chào mừng bạn đến với hệ thống quản trị!
            </span>
            <span className='text-base text-gray-400'>
              Chúc bạn một ngày làm việc hiệu quả.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
