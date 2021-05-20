import {
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_CREATE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_FAIL,
} from '../constants/commentConstants'

export const createCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_CREATE_REQUEST:
      return { loading: true }
    case COMMENT_CREATE_SUCCESS:
      return { loading: false, success: true, comment: action.payload }
    case COMMENT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateCommentReducer = (state = { comment: {} }, action) => {
  switch (action.type) {
    case COMMENT_UPDATE_REQUEST:
      return { loading: true }
    case COMMENT_UPDATE_SUCCESS:
      return { loading: false, success: true, comment: action.payload }
    case COMMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_DELETE_REQUEST:
      return { loading: true }
    case COMMENT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case COMMENT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
