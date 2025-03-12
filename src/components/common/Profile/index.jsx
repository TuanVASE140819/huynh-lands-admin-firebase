import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

function Profile(props) {
  const { infoUser } = useSelector((state) => state.User)
  const email = localStorage.getItem('userEmail')
  return (
    <div className='flex items-center'>
      <Avatar icon={<UserOutlined />} size='large' />
      <div className='text-start flex flex-col  ml-2 justify-center  text-black  text-sm'>
        <p className='font-semibold'>
          {infoUser?.lastName ? `${infoUser?.lastName} ` : ''}
          {infoUser?.firstName}
        </p>
        <span className='text-gray-400'>{email}</span>
      </div>
    </div>
  )
}

Profile.propTypes = {}

export default Profile
