import express from 'express'
import { protect } from '../middlewares/authMiddlewares.js'
import {
  getAllDefaultQuestions,
  createDefaultQuestion,
  updateDefaultQuestion,
  deleteDefaultQuestion,
} from '../controllers/defaultQuestionController.js'

const router = express.Router()

router
  .route('/')
  .get(protect, getAllDefaultQuestions)
  .post(protect, createDefaultQuestion)

router
  .route('/:id')
  .patch(protect, updateDefaultQuestion)
  .delete(protect, deleteDefaultQuestion)

export default router
