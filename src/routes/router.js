import Dashboard from '../pages/Dashboard'
import SEOManager from '../pages/SEO'
import RealEstateManagement from '../pages/RealEstateManagement'
import RealEstateType from '../pages/RealEstateType'
import HistoryPage from '../pages/HistoryPage'
import ContactPage from '../pages/ContactPage'
import RealEstateNews from '../pages/RealEstateNews'
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
  {
    path: '/real-estate/type',
    Component: RealEstateType,
    isAuth: true,
    redirectPath: '/login',
  },
  {
    path: '/real-estate',
    Component: RealEstateManagement,
    isAuth: true,
    redirectPath: '/login',
  },
  {
    path: '/history',
    Component: HistoryPage,
    isAuth: true,
    redirectPath: '/login',
  },
  {
    path: '/contact',
    Component: ContactPage,
    isAuth: false,
    redirectPath: '/login',
  },
  {
    path: '/real-estate-news',
    Component: RealEstateNews,
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
