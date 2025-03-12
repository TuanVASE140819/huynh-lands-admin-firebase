import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

const AuthComponent = ({ isAuth, Component, redirectPath }) => {
  const token = Cookies.get('accessToken')

  if (isAuth) {
    // kiểm tra user đã đăng nhập hay chưa.
    return token ? <Component /> : <Navigate to={redirectPath} />
  }

  return <Component />
}

export default AuthComponent
