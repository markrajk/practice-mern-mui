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

export const getOwnersChartsReducer = (state = { charts: [] }, action) => {
  switch (action.type) {
    case CHART_GET_ALL_OWNER_REQUEST:
      return { loading: true }
    case CHART_GET_ALL_OWNER_SUCCESS:
      return { loading: false, charts: action.payload }
    case CHART_GET_ALL_OWNER_FAIL:
      return { loading: true, error: action.payload }
    default:
      return state
  }
}

export const getOneChartReducer = (state = {}, action) => {
  switch (action.type) {
    case CHART_GET_ONE_REQUEST:
      return { loading: true }
    case CHART_GET_ONE_SUCCESS:
      return { loading: false, chart: action.payload }
    case CHART_GET_ONE_FAIL:
      return { loading: true, error: action.payload }
    default:
      return state
  }
}

export const createChartReducer = (state = {}, action) => {
  switch (action.type) {
    case CHART_CREATE_REQUEST:
      return { loading: true }
    case CHART_CREATE_SUCCESS:
      return { loading: false, success: true, chart: action.payload }
    case CHART_CREATE_FAIL:
      return { loading: true, error: action.payload }
    default:
      return state
  }
}

export const updateChartReducer = (state = {}, action) => {
  switch (action.type) {
    case CHART_UPDATE_REQUEST:
      return { loading: true }
    case CHART_UPDATE_SUCCESS:
      return { loading: false, success: true, chart: action.payload }
    case CHART_UPDATE_FAIL:
      return { loading: true, error: action.payload }
    default:
      return state
  }
}
