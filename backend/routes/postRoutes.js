import express from 'express'
import {
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js'
import { protect } from '../middlewares/authMiddlewares.js'

import commentRouter from './commentRoutes.js'

const router = express.Router()

router.use('/:postId/comments', commentRouter)

router.route('/').get(protect, getAllPosts)
router
  .route('/:id')
  .get(getPost)
  .patch(protect, updatePost)
  .delete(protect, deletePost)

router.route('/users/:userId').get(protect, getAllPosts)

export default router
