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

export const getAllQuestionsReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case QUESTION_GET_ALL_REQUEST:
      return { loading: true, questions: [] }
    case QUESTION_GET_ALL_SUCCESS:
      return { loading: false, questions: action.payload }
    case QUESTION_GET_ALL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_CREATE_REQUEST:
      return { loading: true }
    case QUESTION_CREATE_SUCCESS:
      return { loading: false, success: true, question: action.payload }
    case QUESTION_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateQuestionReducer = (state = { question: {} }, action) => {
  switch (action.type) {
    case QUESTION_UPDATE_REQUEST:
      return { loading: true, question: {} }
    case QUESTION_UPDATE_SUCCESS:
      return { loading: false, success: true, question: action.payload }
    case QUESTION_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_DELETE_REQUEST:
      return { loading: true }
    case QUESTION_DELETE_SUCCESS:
      return { loading: false, success: true }
    case QUESTION_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
