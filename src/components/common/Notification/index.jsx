import { Badge } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import * as React from 'react'
const Notification = () => {
  return (
    <>
      <Badge className='cursor-pointer' count={1} offset={[-5, 5]}>
        <BellOutlined style={{ fontSize: '24px' }} />
      </Badge>
    </>
  )
}

export default Notification
