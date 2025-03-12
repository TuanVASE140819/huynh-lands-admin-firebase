import { combineReducers } from 'redux'
import Common from './commonReducer'
import User from './userReducer'

export const rootReducer = combineReducers({
  Common,
  User,
})
