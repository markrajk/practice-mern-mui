import axios from 'axios'
import {
  QUESTION_GET_ALL_REQUEST,
  QUESTION_GET_ALL_SUCCESS,
  QUESTION_GET_ALL_FAIL,
  QUESTION_CREATE_REQUEST,
  QUESTION_CREATE_SUCCESS,
  QUESTION_CREATE_FAIL,
  QUESTION_UPDATE_REQUEST,
  QUESTION_UPDATE_SUCCESS,
  QUESTION_UPDATE_FAIL,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DELETE_FAIL,
} from '../constants/questionConstants'

export const getAllQuestions = (teamId) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUESTION_GET_ALL_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/v1/teams/${teamId}/questions`,
      config
    )

    const questions = data.data.data

    dispatch({ type: QUESTION_GET_ALL_SUCCESS, payload: questions })
  } catch (error) {
    dispatch({
      type: QUESTION_GET_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createQuestion = (teamId, question) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: QUESTION_CREATE_REQUEST })

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
      `/api/v1/teams/${teamId}/questions`,
      { ...question },
      config
    )

    const newQuestion = data.data.data

    dispatch({ type: QUESTION_CREATE_SUCCESS, payload: newQuestion })
  } catch (error) {
    dispatch({
      type: QUESTION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateQuestion = (teamId, questionId, question) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: QUESTION_UPDATE_REQUEST })

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
      `/api/v1/teams/${teamId}/questions/${questionId}`,
      { ...question },
      config
    )

    const updatedQuestion = data.data.data

    dispatch({ type: QUESTION_UPDATE_SUCCESS, payload: updatedQuestion })
  } catch (error) {
    dispatch({
      type: QUESTION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteQuestion = (teamId, questionId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: QUESTION_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(
      `/api/v1/teams/${teamId}/questions/${questionId}`,
      config
    )

    dispatch({ type: QUESTION_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: QUESTION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
