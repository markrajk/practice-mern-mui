import express from 'express'
import { protect, setUserIds } from '../middlewares/authMiddlewares.js'
import {
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js'

const router = express.Router({ mergeParams: true })

router.use(protect)

router.route('/').post(setUserIds, createComment)

router.route('/:id').patch(updateComment).delete(deleteComment)

export default router
