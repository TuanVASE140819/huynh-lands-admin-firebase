import { call, put, takeLatest } from 'redux-saga/effects'
import { COMMON, USER } from '../constants/constants'
import { userServices } from '../services/userServices'
import ToastCus from '../../components/common/Toast'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function* loginUser({ payload, navigate, action }) {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    const { data } = yield call(() =>
      userServices.login({
        email: payload?.email,
        passWord: payload?.password,
      }),
    )
    if (!data?.accessToken || !data.refreshToken) {
      return ToastCus.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại',
      })
    }
    yield call(() => {
      const getExpirationDateForToday = () => {
        return dayjs().utc().endOf('day').toDate() // Lấy thời điểm 23:59:59 UTC của ngày hiện tại
      }
      const expires = getExpirationDateForToday()
      Cookies.set('accessToken', data?.accessToken, {
        expires,
        // secure: true,
        // sameSite: 'Strict',
      })
    })
    localStorage.setItem('userEmail', payload?.email)
    yield navigate('/')
    yield action.resetForm()
    ToastCus.fire({
      icon: 'success',
      title: 'Đăng nhập thành công',
    })
  } catch (error) {
    console.log(error)
    ToastCus.fire({
      icon: 'error',
      title: error?.response?.data?.message || 'Có lỗi xảy ra',
    })
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}

function* getInfoUser({ navigate }) {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    const email = localStorage.getItem('userEmail')
    const { data } = yield call(() => userServices.getInfoByEmail(email))
    yield put({
      type: USER.DISPATCH_INFO_LOGIN,
      payload: data,
    })
    // Cookies.set('accessToken', data.token, {
    //   // expires,
    //   // secure: true,
    //   // sameSite: 'Strict',
    // })
  } catch (error) {
    console.log(error)
    if (error?.response?.status === 401) {
      yield Cookies.remove('accessToken')
      yield localStorage.removeItem('userEmail')
      yield navigate('/login')
      yield put({
        type: COMMON.DISPATCH_RESET_STORE,
      })
      ToastCus.fire({
        icon: 'error',
        title: 'Vui lòng đăng nhập lại',
      })
      return
    }
    ToastCus.fire({
      icon: 'error',
      title: error?.response?.data?.message || 'Có lỗi xảy ra',
    })
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}

function* logoutUser({ navigate }) {
  try {
    yield Cookies.remove('accessToken')
    yield localStorage.removeItem('userEmail')
    yield navigate('/login')
    yield put({
      type: COMMON.DISPATCH_RESET_STORE,
    })
    ToastCus.fire({
      icon: 'success',
      title: 'Đăng xuất thành công!',
    })
  } catch (error) {
    console.log(error)
    ToastCus.fire({
      icon: 'error',
      title: error?.response?.data?.message || 'Đăng xuất thất bại',
    })
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}

export function* userSaga() {
  yield takeLatest(USER.GET_LOGIN_API, loginUser)
  yield takeLatest(USER.UPDATE_INFO_USER_ACCESS_TOKEN, getInfoUser)
  yield takeLatest(USER.LOGOUT_USER, logoutUser)
}
