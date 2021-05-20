import {
  INVITATION_CREATE_REQUEST,
  INVITATION_CREATE_SUCCESS,
  INVITATION_CREATE_FAIL,
  INVITATION_DELETE_REQUEST,
  INVITATION_DELETE_SUCCESS,
  INVITATION_DELETE_FAIL,
} from '../constants/invitationConstants'

export const createInvitationReducer = (state = {}, action) => {
  switch (action.type) {
    case INVITATION_CREATE_REQUEST:
      return { loading: true }
    case INVITATION_CREATE_SUCCESS:
      return { loading: false, success: true, invitation: action.payload }
    case INVITATION_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteInvitationReducer = (state = {}, action) => {
  switch (action.type) {
    case INVITATION_DELETE_REQUEST:
      return { loading: true }
    case INVITATION_DELETE_SUCCESS:
      return { loading: false, success: true }
    case INVITATION_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
