import axios from 'axios'
import {
  CHART_GET_ALL_OWNER_REQUEST,
  CHART_GET_ALL_OWNER_SUCCESS,
  CHART_GET_ALL_OWNER_FAIL,
  CHART_UPDATE_REQUEST,
  CHART_UPDATE_SUCCESS,
  CHART_UPDATE_FAIL,
  CHART_GET_ONE_REQUEST,
  CHART_GET_ONE_SUCCESS,
  CHART_GET_ONE_FAIL,
  CHART_CREATE_REQUEST,
  CHART_CREATE_SUCCESS,
  CHART_CREATE_FAIL,
} from '../constants/chartConstants'

export const getOwnersCharts = (ownerId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHART_GET_ALL_OWNER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/charts/owners/${ownerId}`, config)

    const charts = data.data.data

    dispatch({ type: CHART_GET_ALL_OWNER_SUCCESS, payload: charts })
  } catch (error) {
    dispatch({
      type: CHART_GET_ALL_OWNER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOneChart = (chartId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHART_GET_ONE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/charts/${chartId}`, config)

    const chart = data.data.data

    dispatch({ type: CHART_GET_ONE_SUCCESS, payload: chart })
  } catch (error) {
    dispatch({
      type: CHART_GET_ONE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createChart = (chart) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHART_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/v1/charts`, { ...chart }, config)

    const newChart = data.data.data

    dispatch({ type: CHART_CREATE_SUCCESS, payload: newChart })
  } catch (error) {
    dispatch({
      type: CHART_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateChart = (chartId, chart) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHART_UPDATE_REQUEST })

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
      `/api/v1/charts/${chartId}`,
      { ...chart },
      config
    )

    const updatedChart = data.data.data

    dispatch({ type: CHART_UPDATE_SUCCESS, payload: updatedChart })
  } catch (error) {
    dispatch({
      type: CHART_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
