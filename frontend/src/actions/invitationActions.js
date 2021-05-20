import axios from 'axios'
import {
  INVITATION_CREATE_REQUEST,
  INVITATION_CREATE_SUCCESS,
  INVITATION_CREATE_FAIL,
  INVITATION_DELETE_REQUEST,
  INVITATION_DELETE_SUCCESS,
  INVITATION_DELETE_FAIL,
} from '../constants/invitationConstants'
import { USER_LOGIN_SUCCESS } from '../constants/userConstants'

export const createInvitation = (userId, teamId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: INVITATION_CREATE_REQUEST,
    })

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
      `/api/v1/teams/${teamId}/invitations`,
      { receiver: userId },
      config
    )

    const invitation = data.data.data

    dispatch({
      type: INVITATION_CREATE_SUCCESS,
      payload: invitation,
    })
  } catch (error) {
    dispatch({
      type: INVITATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteInvitation = (invitationId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: INVITATION_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/v1/invitations/${invitationId}`, config)

    let user = JSON.parse(localStorage.getItem('userInfo'))
    user.invitations = user.invitations.filter(
      (inv) => inv._id !== invitationId
    )

    localStorage.setItem('userInfo', JSON.stringify(user))

    dispatch({
      type: INVITATION_DELETE_SUCCESS,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: user,
    })
  } catch (error) {
    dispatch({
      type: INVITATION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
