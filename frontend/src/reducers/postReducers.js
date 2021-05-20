import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
} from '../constants/postConstants'

export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true, posts: [] }
    case POST_LIST_SUCCESS:
      return { loading: false, posts: action.payload }
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getPostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case GET_POST_REQUEST:
      return { loading: true, post: {} }
    case GET_POST_SUCCESS:
      return { loading: false, post: action.payload }
    case GET_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { loading: true }
    case CREATE_POST_SUCCESS:
      return { loading: false, success: true, post: action.payload }
    case CREATE_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updatePostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case UPDATE_POST_REQUEST:
      return { loading: true }
    case UPDATE_POST_SUCCESS:
      return { loading: false, success: true, post: action.payload }
    case UPDATE_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { loading: true }
    case DELETE_POST_SUCCESS:
      return { loading: false, success: true }
    case DELETE_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
