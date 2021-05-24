import {
  FEEDBACK_CREATE_REQUEST,
  FEEDBACK_CREATE_SUCCESS,
  FEEDBACK_CREATE_FAIL,
} from '../constants/feedbackConstants'

export const createFeedbackReducer = (state = {}, action) => {
  switch (action.type) {
    case FEEDBACK_CREATE_REQUEST:
      return { loading: true }
    case FEEDBACK_CREATE_SUCCESS:
      return { loading: false, success: true, feedback: action.payload }
    case FEEDBACK_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
