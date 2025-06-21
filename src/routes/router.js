import Dashboard from '../pages/Dashboard'
import SEOManager from '../pages/SEO'
// import CheckInOut from '../components/layouts/ChamCong/CheckInOut'

export const route = [
  {
    index: true,
    path: '/',
    Component: Dashboard,
    isAuth: true,
    redirectPath: '/login',
  },
  {
    path: '/seo',
    Component: SEOManager,
    isAuth: true,
    redirectPath: '/login',
  },
  // {
  //   path: '/chamcong/checkinout',
  //   Component: CheckInOut,
  //   isAuth: true,
  //   redirectPath: '/login',
  // },
]
