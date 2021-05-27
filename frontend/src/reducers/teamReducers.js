import {
  TEAM_CREATE_REQUEST,
  TEAM_CREATE_SUCCESS,
  TEAM_CREATE_FAIL,
  TEAM_DEMO_CREATE_REQUEST,
  TEAM_DEMO_CREATE_SUCCESS,
  TEAM_DEMO_CREATE_FAIL,
  TEAM_GET_ALL_REQUEST,
  TEAM_GET_ALL_SUCCESS,
  TEAM_GET_ALL_FAIL,
  TEAM_GET_ONE_REQUEST,
  TEAM_GET_ONE_SUCCESS,
  TEAM_GET_ONE_FAIL,
  TEAM_UPDATE_REQUEST,
  TEAM_UPDATE_SUCCESS,
  TEAM_UPDATE_FAIL,
  TEAM_DELETE_REQUEST,
  TEAM_DELETE_SUCCESS,
  TEAM_DELETE_FAIL,
  TEAM_JOIN_REQUEST,
  TEAM_JOIN_SUCCESS,
  TEAM_JOIN_FAIL,
} from '../constants/teamConstants'

export const getAllUsersTeamsReducer = (state = { teams: [] }, action) => {
  switch (action.type) {
    case TEAM_GET_ALL_REQUEST:
      return { loading: true, teams: [] }
    case TEAM_GET_ALL_SUCCESS:
      return { loading: false, success: true, teams: action.payload }
    case TEAM_GET_ALL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_GET_ONE_REQUEST:
      return { loading: true }
    case TEAM_GET_ONE_SUCCESS:
      return { loading: false, success: true, team: action.payload }
    case TEAM_GET_ONE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_CREATE_REQUEST:
      return { loading: true }
    case TEAM_CREATE_SUCCESS:
      return { loading: false, success: true, team: action.payload }
    case TEAM_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createDemoTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_DEMO_CREATE_REQUEST:
      return { loading: true }
    case TEAM_DEMO_CREATE_SUCCESS:
      return { loading: false, success: true, team: action.payload }
    case TEAM_DEMO_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_UPDATE_REQUEST:
      return { loading: true }
    case TEAM_UPDATE_SUCCESS:
      return { loading: false, success: true, team: action.payload }
    case TEAM_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_DELETE_REQUEST:
      return { loading: true }
    case TEAM_DELETE_SUCCESS:
      return { loading: false, success: true }
    case TEAM_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const joinTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_JOIN_REQUEST:
      return { loading: true }
    case TEAM_JOIN_SUCCESS:
      return { loading: false, success: true, team: action.payload }
    case TEAM_JOIN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
