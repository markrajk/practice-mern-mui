import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  UPDATE_ME_REQUEST,
  UPDATE_ME_SUCCESS,
  UPDATE_ME_FAIL,
  USER_UPDATE_SETTINGS_REQUEST,
  USER_UPDATE_SETTINGS_SUCCESS,
  USER_UPDATE_SETTINGS_FAIL,
  USER_GET_ONE_REQUEST,
  USER_GET_ONE_SUCCESS,
  USER_GET_ONE_FAIL,
  USER_GET_ALL_REQUEST,
  USER_GET_ALL_SUCCESS,
  USER_GET_ALL_FAIL,
  USER_UPDATE_ONE_REQUEST,
  USER_UPDATE_ONE_SUCCESS,
  USER_UPDATE_ONE_FAIL,
  CLEAR_DB_REQUEST,
  CLEAR_DB_SUCCESS,
  CLEAR_DB_FAIL,
} from '../constants/userConstants'

export const getUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_ONE_REQUEST:
      return { loading: true }
    case USER_GET_ONE_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_GET_ONE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getAllUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GET_ALL_REQUEST:
      return { loading: true }
    case USER_GET_ALL_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_GET_ALL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true }
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const updateMeReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ME_REQUEST:
      return { loading: true }
    case UPDATE_ME_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case UPDATE_ME_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_ONE_REQUEST:
      return { loading: true }
    case USER_UPDATE_ONE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_ONE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateUserSettingsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_SETTINGS_REQUEST:
      return { loading: true }
    case USER_UPDATE_SETTINGS_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_SETTINGS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const clearDBReducer = (state = {}, action) => {
  switch (action.type) {
    case CLEAR_DB_REQUEST:
      return { loading: true }
    case CLEAR_DB_SUCCESS:
      return { loading: false, success: true }
    case CLEAR_DB_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
