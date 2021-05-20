import express from 'express'
import { deleteInvitation } from '../controllers/invitationController.js'
import {
  protect,
  setReceiverIds,
  setSenderIds,
} from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route('/:id').delete(protect, deleteInvitation)

export default router
