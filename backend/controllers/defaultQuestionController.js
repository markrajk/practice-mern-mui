import DefaultQuestion from '../models/defaultQuestionModel.js'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'

export const getAllDefaultQuestions = catchAsync(async (req, res, next) => {
  const defaultQuestions = await DefaultQuestion.find()

  res.status(200).json({
    status: 'success',
    results: defaultQuestions.length,
    data: {
      data: defaultQuestions,
    },
  })
})

export const createDefaultQuestion = catchAsync(async (req, res, next) => {
  const question = await DefaultQuestion.create(req.body)

  res.status(201).send({
    status: 'success',
    data: {
      data: question,
    },
  })
})

export const updateDefaultQuestion = catchAsync(async (req, res, next) => {
  const question = await DefaultQuestion.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidation: true,
    }
  )

  if (!question) {
    return next(new AppError('No question found with that id', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: question,
    },
  })
})

export const deleteDefaultQuestion = catchAsync(async (req, res, next) => {
  const question = await DefaultQuestion.findByIdAndDelete(req.params.id)

  if (!question) {
    return next(new AppError('No question found with that id', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null,
  })
})
