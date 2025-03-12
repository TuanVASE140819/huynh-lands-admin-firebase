import { produce } from 'immer'
import { USER, COMMON } from '../constants/constants'

const initialState = {
  infoUser: null,
}

const User = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case COMMON.DISPATCH_RESET_STORE:
        return initialState
      case USER.DISPATCH_INFO_LOGIN:
        draft.infoUser = payload
        break
      default:
        return state
    }
  })
}

export default User
