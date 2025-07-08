import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button, ConfigProvider, Layout, Menu, theme } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ContactsOutlined,
  HomeOutlined,
} from '@ant-design/icons'
import logo from '../../assets/images/logo/logo.png'
import ButtonLogout from '../../components/common/ButtonLogout'
import Notification from '../../components/common/Notification'
import Profile from '../../components/common/Profile'
import LoadingPage from '../../pages/LoadingPage'
import { updateInfoUserToStore } from '../../redux/actions/userActions'
import Cookies from 'js-cookie'

const { Header, Sider, Content } = Layout

const itemsMenu = [
  {
    key: '/',
    label: <Link to='/'>Trang chủ</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: '/seo',
    label: <Link to='/seo'>Quản lý SEO</Link>,
    icon: <ContactsOutlined />,
  },
  {
    key: 'real-estate-parent',
    label: 'Quản lý Bất động sản',
    icon: <ContactsOutlined />,
    children: [
      {
        key: '/real-estate/type',
        label: <Link to='/real-estate/type'>Loại bất động sản</Link>,
      },
      {
        key: '/real-estate',
        label: <Link to='/real-estate'>Bất động sản</Link>,
      },
    ],
  },
  {
    key: 'page-management',
    label: 'Quản lý trang',
    icon: <ContactsOutlined />,
    children: [
      {
        key: '/history',
        label: <Link to='/history'>Trang giới thiệu</Link>,
      },
      {
        key: '/contact',
        label: <Link to='/contact'>Liên hệ</Link>,
      },
    ],
  },
  {
    key: 'news-management',
    label: 'Quản lý bản tin',
    icon: <ContactsOutlined />,
    children: [
      {
        key: '/real-estate-news',
        label: <Link to='/real-estate-news'>Bản tin bất động sản</Link>,
      },
    ],
  },
]

function RootLayout(props) {
  const navigate = useNavigate()
  const { infoUser } = useSelector((state) => state.User)
  const token = Cookies.get('accessToken')
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState([])
  const [openKeys, setOpenKeys] = useState([])
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const dispatch = useDispatch()

  const getRouteName = useMemo(() => {
    return (pathname) => {
      let title
      if (!pathname || pathname === '/') return 'Trang chủ'
      itemsMenu?.map((item) => {
        const temp = item?.children?.find(
          (child) => child?.key === pathname,
        )?.title
        title = temp ? temp : ''
      })
      return title
    }
  }, [])

  useEffect(() => {
    const path = location.pathname
    setSelectedKeys([path])
    const openKey = itemsMenu.find((item) =>
      item.children?.some((child) => child.key === path),
    )?.key
    setOpenKeys(openKey ? [openKey] : [])
  }, [location.pathname])

  // Handle submenu open/close
  const onOpenChange = (keys) => {
    setOpenKeys(keys)
  }

  // Handle menu item selection
  const onSelect = ({ key, selectedKeys }) => {
    setSelectedKeys(selectedKeys)
  }
  useEffect(() => {
    token && dispatch(updateInfoUserToStore(navigate)) //fetch info user by access token
  }, [])

  return (
    <>
      <Layout className='hidden lg:flex'>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                darkItemBg: '#232526', // sidebar: nền đen xám sang trọng
                darkSubMenuItemBg: '#232526',
                darkPopupBg: '#232526',
                darkItemTextColor: '#FFD700', // chữ vàng ánh kim
                darkHoverItemBg: '#414345',
                darkSelectedItemBg: '#FFD70022',
              },
            },
          }}
        >
          <Sider
            trigger={null}
            style={{
              backgroundColor: '#232526', // sidebar: nền đen xám sang trọng
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
              borderRight: '1px solid #FFD70044',
              boxShadow: '2px 0 8px 0 #0002',
            }}
            collapsible
            collapsed={collapsed}
          >
            <div className='h-20 flex justify-center items-center'>
              {!collapsed ? (
                <Link to='/'>
                  <div className='flex items-center gap-2'>
                    <img
                      className='w-10 h-10 rounded-full border-2 border-[#FFD700] bg-white bg-opacity-80 shadow'
                      src={logo}
                      alt='logo'
                    />
                    <h2 className='text-xl font-bold bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent drop-shadow'>
                      Huỳnh Land
                    </h2>
                  </div>
                </Link>
              ) : (
                <Link to='/'>
                  <img className='w-12 py-3' src={logo} alt='logo' />
                </Link>
              )}
            </div>
            <Menu
              theme='dark'
              mode='inline'
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              onSelect={onSelect}
              items={itemsMenu}
              className='mt-4'
            />
          </Sider>
        </ConfigProvider>
        <Layout
          style={{
            marginLeft: !collapsed ? 200 : 80,
            transition: 'all .3s',
          }}
        >
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              zIndex: 1,
              position: 'relative',
            }}
          >
            <div className='flex justify-between '>
              <div className='flex gap-3 items-center'>
                <Button
                  type='text'
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                  }}
                />
                <div className=' flex flex-col gap-1'>
                  <h2 className='font-semibold leading-none text-lg text-gray-700'>
                    {getRouteName(location.pathname)}
                  </h2>
                </div>
              </div>
              <div className='px-5'>
                <div className='flex justify-between items-center '>
                  <ul className=' flex justify-center gap-4 items-center pt-3'>
                    {/* <li>
                      <Notification />
                    </li> */}
                    <li>
                      <Profile />
                    </li>
                    <li>
                      <ButtonLogout />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Header>
          <Content
            style={{
              minHeight: 'calc(100vh - 64px)',
              background: colorBgContainer,
              borderRadius: 0,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <LoadingPage />
    </>
  )
}

RootLayout.propTypes = {}

export default RootLayout
