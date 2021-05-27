import axios from 'axios'
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

export const getAllUsersTeams = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_GET_ALL_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/teams`, config)

    const teams = data.data.data

    dispatch({ type: TEAM_GET_ALL_SUCCESS, payload: teams })
  } catch (error) {
    dispatch({
      type: TEAM_GET_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getTeam = (teamId) => async (dispatch, getState) => {
  try {
    console.log(teamId)
    dispatch({ type: TEAM_GET_ONE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/teams/${teamId}`, config)

    const team = data.data.data

    dispatch({ type: TEAM_GET_ONE_SUCCESS, payload: team })
  } catch (error) {
    dispatch({
      type: TEAM_GET_ONE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createTeam = (team) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/v1/teams`, { ...team }, config)

    const newTeam = data.data.data

    dispatch({ type: TEAM_CREATE_SUCCESS, payload: newTeam })
  } catch (error) {
    dispatch({
      type: TEAM_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createDemoTeam = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_DEMO_CREATE_REQUEST })

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
      `/api/v1/teams/createDemoTeam`,
      {},
      config
    )

    const newTeam = data.data.data

    dispatch({ type: TEAM_DEMO_CREATE_SUCCESS, payload: newTeam })
  } catch (error) {
    dispatch({
      type: TEAM_DEMO_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateTeam = (teamId, team) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_UPDATE_REQUEST })

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
      `/api/v1/teams/${teamId}`,
      { ...team },
      config
    )

    const updatedTeam = data.data.data

    dispatch({ type: TEAM_UPDATE_SUCCESS, payload: updatedTeam })
  } catch (error) {
    dispatch({
      type: TEAM_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const joinTeam = (teamId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_JOIN_REQUEST })

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
      `/api/v1/teams/${teamId}/joinTeam`,
      {},
      config
    )

    const updatedTeam = data.data.data

    dispatch({ type: TEAM_JOIN_SUCCESS, payload: updatedTeam })
  } catch (error) {
    dispatch({
      type: TEAM_JOIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteTeam = (teamId) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/v1/teams/${teamId}`, config)

    dispatch({ type: TEAM_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: TEAM_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
