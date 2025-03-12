import React from 'react'
import { Spin } from 'antd'
import { useSelector } from 'react-redux'

const LoadingPage = () => {
  const { isLoadingScreen } = useSelector((state) => state.Common)
  return <Spin size='large' spinning={isLoadingScreen} fullscreen />
}

export default LoadingPage
