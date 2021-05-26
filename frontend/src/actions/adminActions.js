import axios from 'axios'
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

export const adminGetAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_GET_ALL_USERS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/admins/users`, config)

    const users = data.data.data

    dispatch({ type: ADMIN_GET_ALL_USERS_SUCCESS, payload: users })
  } catch (error) {
    dispatch({
      type: ADMIN_GET_ALL_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const adminUpdateUser = (userId, user) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_UPDATE_USER_REQUEST })

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
      `/api/v1/admins/users/${userId}`,
      user,
      config
    )

    const updatedUser = data.data.data

    dispatch({ type: ADMIN_UPDATE_USER_SUCCESS, payload: updatedUser })
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const adminDeleteUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DELETE_USER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/v1/admins/users/${userId}`, config)

    dispatch({ type: ADMIN_DELETE_USER_SUCCESS })
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const adminGetAllQuestions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_GET_ALL_QUESTIONS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/admins/defaultQuestions`, config)

    const questions = data.data.data

    dispatch({ type: ADMIN_GET_ALL_QUESTIONS_SUCCESS, payload: questions })
  } catch (error) {
    dispatch({
      type: ADMIN_GET_ALL_QUESTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const adminCreateQuestion = (question) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_CREATE_QUESTION_REQUEST })

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
      `/api/v1/admins/defaultQuestions`,
      question,
      config
    )

    const newQuestion = data.data.data

    dispatch({ type: ADMIN_CREATE_QUESTION_SUCCESS, payload: newQuestion })
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_QUESTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const adminUpdateQuestion = (questionId, question) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ADMIN_UPDATE_QUESTION_REQUEST })

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
      `/api/v1/admins/defaultQuestions/${questionId}`,
      question,
      config
    )

    const newQuestion = data.data.data

    dispatch({ type: ADMIN_UPDATE_QUESTION_SUCCESS, payload: newQuestion })
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_QUESTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const adminDeleteQuestion = (questionId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ADMIN_DELETE_QUESTION_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/v1/admins/defaultQuestions/${questionId}`, config)

    dispatch({ type: ADMIN_DELETE_QUESTION_SUCCESS })
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_QUESTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
