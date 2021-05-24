import express from 'express'
import {
  createFeedback,
  setFeedbackReceiverIds,
} from '../controllers/feedbackController.js'
import {
  protect,
  setSenderIds,
  setTeamIds,
} from '../middlewares/authMiddlewares.js'

const router = express.Router()

router
  .route('/teams/:teamId/users/:userId')
  .post(
    protect,
    setSenderIds,
    setFeedbackReceiverIds,
    setTeamIds,
    createFeedback
  )

export default router
