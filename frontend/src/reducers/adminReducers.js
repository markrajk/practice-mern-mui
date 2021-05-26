import {
  ADMIN_GET_ALL_USERS_REQUEST,
  ADMIN_GET_ALL_USERS_SUCCESS,
  ADMIN_GET_ALL_USERS_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_GET_ALL_QUESTIONS_REQUEST,
  ADMIN_GET_ALL_QUESTIONS_SUCCESS,
  ADMIN_GET_ALL_QUESTIONS_FAIL,
  ADMIN_CREATE_QUESTION_REQUEST,
  ADMIN_CREATE_QUESTION_SUCCESS,
  ADMIN_CREATE_QUESTION_FAIL,
  ADMIN_UPDATE_QUESTION_REQUEST,
  ADMIN_UPDATE_QUESTION_SUCCESS,
  ADMIN_UPDATE_QUESTION_FAIL,
  ADMIN_DELETE_QUESTION_REQUEST,
  ADMIN_DELETE_QUESTION_SUCCESS,
  ADMIN_DELETE_QUESTION_FAIL,
} from '../constants/adminConstants'

export const adminGetAllUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_GET_ALL_USERS_REQUEST:
      return { loading: true }
    case ADMIN_GET_ALL_USERS_SUCCESS:
      return { loading: false, users: action.payload }
    case ADMIN_GET_ALL_USERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminUpdateUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_USER_REQUEST:
      return { loading: true, user: {} }
    case ADMIN_UPDATE_USER_SUCCESS:
      return { loading: false, success: true, user: action.payload }
    case ADMIN_UPDATE_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminDeleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_USER_REQUEST:
      return { loading: true }
    case ADMIN_DELETE_USER_SUCCESS:
      return { loading: false, success: true }
    case ADMIN_DELETE_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminGetAllQuestionsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_GET_ALL_QUESTIONS_REQUEST:
      return { loading: true }
    case ADMIN_GET_ALL_QUESTIONS_SUCCESS:
      return { loading: false, questions: action.payload }
    case ADMIN_GET_ALL_QUESTIONS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminCreateQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CREATE_QUESTION_REQUEST:
      return { loading: true }
    case ADMIN_CREATE_QUESTION_SUCCESS:
      return { loading: false, success: true, question: action.payload }
    case ADMIN_CREATE_QUESTION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminUpdateQuestionReducer = (
  state = { question: {} },
  action
) => {
  switch (action.type) {
    case ADMIN_UPDATE_QUESTION_REQUEST:
      return { loading: true, question: {} }
    case ADMIN_UPDATE_QUESTION_SUCCESS:
      return { loading: false, success: true, question: action.payload }
    case ADMIN_UPDATE_QUESTION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminDeleteQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_QUESTION_REQUEST:
      return { loading: true }
    case ADMIN_DELETE_QUESTION_SUCCESS:
      return { loading: false, success: true }
    case ADMIN_DELETE_QUESTION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
