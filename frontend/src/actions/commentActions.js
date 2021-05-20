import axios from 'axios'
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

export const createComment = (postId, comment) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: COMMENT_CREATE_REQUEST })

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
      `/api/v1/posts/${postId}/comments`,
      { comment },
      config
    )

    const newComment = data.data.data

    dispatch({
      type: COMMENT_CREATE_SUCCESS,
      payload: newComment,
    })
  } catch (error) {
    dispatch({
      type: COMMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateComment = (postId, commentId, comment) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: COMMENT_UPDATE_REQUEST })

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
      `/api/v1/posts/${postId}/comments/${commentId}`,
      { comment },
      config
    )

    const updatedComment = data.data.data

    dispatch({
      type: COMMENT_UPDATE_SUCCESS,
      payload: updatedComment,
    })
  } catch (error) {
    dispatch({
      type: COMMENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteComment = (postId, commentId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: COMMENT_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/v1/posts/${postId}/comments/${commentId}`, config)

    dispatch({
      type: COMMENT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: COMMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
