import Comment from '../models/commentModel.js'
import Post from '../models/postModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

import {
  getAll,
  createOne,
  updateOne,
  deleteOne,
} from '../utils/handlerFactory.js'

// export const setPostReceiverIds = (req, res, next) => {
//   if (req.params.id) req.body.receiver = req.params.id
//   next()
// }

export const createComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.create(req.body)

  const post = await Post.findByIdAndUpdate(req.params.postId, {
    $push: { comments: comment._id },
  })

  if (!post) {
    return next(new AppError('No post found with that ID', 404))
  }

  res.status(201).send({
    status: 'success',
    data: {
      data: comment,
    },
  })
})

export const updateComment = updateOne(Comment)
export const deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id)

  if (!comment) {
    return next(new AppError('No comment found with that ID', 404))
  }

  const post = await Post.findByIdAndUpdate(req.params.postId, {
    $pull: { comments: comment._id },
  })

  if (!post) {
    return next(new AppError('No post found with that ID', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null,
  })
})
