import express from 'express'
import { protect, restrictToUserRole } from '../middlewares/authMiddlewares.js'
import {
  updateUser,
  deleteUser,
  getAllUsers,
} from '../controllers/userController.js'
import {
  getAllDefaultQuestions,
  createDefaultQuestion,
  updateDefaultQuestion,
  deleteDefaultQuestion,
} from '../controllers/defaultQuestionController.js'

const router = express.Router()

router.use(protect)
router.use(restrictToUserRole('admin'))

router.route('/users').get(getAllUsers)
router.route('/users/:id').patch(updateUser).delete(deleteUser)

router
  .route('/defaultQuestions')
  .get(getAllDefaultQuestions)
  .post(createDefaultQuestion)
router
  .route('/defaultQuestions/:id')
  .patch(updateDefaultQuestion)
  .delete(deleteDefaultQuestion)

export default router
