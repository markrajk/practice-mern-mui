import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from '../utils/handlerFactory.js'

export const getAllPosts = getAll(Post, [
  { path: 'user' },
  { path: 'comments', populate: { path: 'user' } },
])
export const getPost = getOne(Post, [
  { path: 'user' },
  { path: 'comments', populate: { path: 'user' } },
])
export const createPost = createOne(Post)
export const updatePost = updateOne(Post)
export const deletePost = deleteOne(Post)
