import Chart from '../models/chartModel.js'
import {
  createOne,
  getAll,
  deleteOne,
  updateOne,
  getOne,
} from '../utils/handlerFactory.js'

export const getOneChart = getOne(Chart)
export const getAllLineCharts = getAll(Chart)
export const createLineChart = createOne(Chart)
export const updateLineChart = updateOne(Chart)
export const deleteLineChart = deleteOne(Chart)
