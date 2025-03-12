import { all } from 'redux-saga/effects'
import { userSaga } from './userSaga'
import { commonSaga } from './commonSaga'

export function* rootSaga() {
  yield all([userSaga(), commonSaga(), ])
}
