import React from 'react'
import srcLogo from '../../assets/images/logo/logo.png'

const Dashboard = () => {
  return (
    <div className='p-2 bg-[#EFEFEF] h-full'>
      <div className='rounded-md p-2 h-full flex flex-col items-center pt-32 '>
        {/* shadow-2xl bg-white */}
        <div className='flex justify-center'>
          <img src={srcLogo} className='w-72 h-72'></img>
        </div>
        <div className='flex flex-col justify-center text-amber-500 font-bold text-[2.5rem] font-sans font-outline text-center'>
          <p className='leading-10'>TuanWebApp</p>
          <p className='leading-10 text-[1.8rem]'>.........</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
