import axios from 'axios'
import {
  FEEDBACK_CREATE_REQUEST,
  FEEDBACK_CREATE_SUCCESS,
  FEEDBACK_CREATE_FAIL,
} from '../constants/feedbackConstants'

export const createFeedback = (teamId, userId, feedback) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: FEEDBACK_CREATE_REQUEST })

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
      `/api/v1/feedbacks/teams/${teamId}/users/${userId}`,
      feedback,
      config
    )

    const newFeedback = data.data.data

    dispatch({ type: FEEDBACK_CREATE_SUCCESS, payload: newFeedback })
  } catch (error) {
    dispatch({
      type: FEEDBACK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
