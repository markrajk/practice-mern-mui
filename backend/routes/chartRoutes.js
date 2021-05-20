import express from 'express'
import { protect, setOwnerIds } from '../middlewares/authMiddlewares.js'
import {
  createLineChart,
  getAllLineCharts,
  deleteLineChart,
  updateLineChart,
  getOneChart,
} from '../controllers/chartController.js'

const router = express.Router()

router.route('/owners/:ownerId').get(protect, getAllLineCharts)
router.route('/').post(protect, setOwnerIds, createLineChart)
router
  .route('/:id')
  .get(protect, getOneChart)
  .delete(protect, deleteLineChart)
  .patch(protect, updateLineChart)

export default router
