import { USER } from '../constants/constants'

export const loginUser = (payload, navigate, action) => ({
  type: USER.GET_LOGIN_API,
  payload,
  navigate,
  action,
})

export const logoutUser = (navigate) => ({
  type: USER.LOGOUT_USER,
  navigate,
})

export const updateInfoUserToStore = (navigate) => ({
  type: USER.UPDATE_INFO_USER_ACCESS_TOKEN,
  navigate,
})
