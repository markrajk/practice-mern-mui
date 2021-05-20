import axios from 'axios'
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

export const listPosts = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const route = userId ? `/api/v1/posts/users/${userId}` : '/api/v1/posts/'

    const { data } = await axios.get(route, config)

    const posts = data.data.data

    dispatch({ type: POST_LIST_SUCCESS, payload: posts })
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_REQUEST })

    const { data } = await axios.get(`/api/v1/posts/${id}`)

    const post = data.data.data

    dispatch({ type: GET_POST_SUCCESS, payload: post })
  } catch (error) {
    dispatch({
      type: GET_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPost = (message, receiverId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `/api/v1/users/${receiverId}/posts`,
      { message },
      config
    )

    const post = data.data.data

    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: post,
    })
    // console.log(updatedPosts)
    // dispatch({ type: POST_LIST_SUCCESS, payload: updatedPosts })
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePost = (postId, message) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_POST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.patch(
      `/api/v1/posts/${postId}`,
      { message },
      config
    )
    const post = data.data.data

    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: post,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePost = (postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/v1/posts/${postId}`, config)

    dispatch({
      type: DELETE_POST_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
