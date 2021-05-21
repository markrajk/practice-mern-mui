import Question from '../models/questionModel.js'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'

export const getAllQuestions = catchAsync(async (req, res, next) => {
  const questions = await Question.find({ team: req.params.teamId })

  res.status(200).json({
    status: 'success',
    results: questions.length,
    data: {
      data: questions,
    },
  })
})

export const createQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.create(req.body)

  res.status(201).send({
    status: 'success',
    data: {
      data: question,
    },
  })
})

export const updateQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidation: true,
  })

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

export const deleteQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findByIdAndDelete(req.params.id)

  if (!question) {
    return next(new AppError('No question found with that id', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null,
  })
})
