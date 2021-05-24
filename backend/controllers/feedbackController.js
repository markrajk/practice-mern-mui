import Feedback from '../models/feedbackModel.js'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import { createOne } from '../utils/handlerFactory.js'

export const setFeedbackReceiverIds = (req, res, next) => {
  if (req.params.userId) req.body.receiver = req.params.userId
  next()
}

export const createFeedback = createOne(Feedback, [
  { path: 'sender' },
  { path: 'receiver' },
  { path: 'answers' },
])
