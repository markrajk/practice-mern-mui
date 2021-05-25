import express from 'express'
import {
  protect,
  restrictToTeamRoles,
  setTeamIds,
} from '../middlewares/authMiddlewares.js'
import {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  createQuestionsFromDefault,
} from '../controllers/questionController.js'

const router = express.Router({ mergeParams: true })

router
  .route('/createFromDefault')
  .get(
    protect,
    setTeamIds,
    restrictToTeamRoles('owner', 'admin'),
    createQuestionsFromDefault
  )

router
  .route('/')
  .get(protect, getAllQuestions)
  .post(
    protect,
    setTeamIds,
    restrictToTeamRoles('owner', 'admin'),
    createQuestion
  )

router
  .route('/:id')
  .patch(protect, restrictToTeamRoles('owner', 'admin'), updateQuestion)
  .delete(protect, restrictToTeamRoles('owner', 'admin'), deleteQuestion)

export default router
