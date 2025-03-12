import { call, put, takeLatest } from 'redux-saga/effects'
import { COMMON } from '../constants/constants'
import { commonServices } from '../services/commonServices'
import ToastCus from '../../components/common/Toast'

// function* fetchListCty() {
//   try {
//     const { data } = yield call(commonServices.getAllCty)
//     yield put({
//       type: COMMON.DISPATCH_SET_LIST_CTY,
//       payload: data,
//     })
//   } catch (error) {
//     console.log(error)
//     ToastCus.fire({
//       icon: 'error',
//       title: error?.response?.data?.message || 'Có lỗi xảy ra',
//     })
//   }
// }

// function* fetchListCNByIdct({ idct }) {
//   try {
//     const { data } = yield call(() => commonServices.getAllCnByIdct(idct))
//     yield put({
//       type: COMMON.DISPATCH_SET_LIST_CN,
//       payload: data,
//     })
//   } catch (error) {
//     console.log(error)
//     ToastCus.fire({
//       icon: 'error',
//       title: error?.response?.data?.message || 'Có lỗi xảy ra',
//     })
//   }
// }

export function* commonSaga() {
  // yield takeLatest(COMMON.DISPATCH_GET_LIST_CTY, fetchListCty)
  // yield takeLatest(COMMON.DISPATCH_GET_LIST_CN, fetchListCNByIdct)
}
