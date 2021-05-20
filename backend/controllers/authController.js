import { promisify } from 'util'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import Email from '../utils/email.js'

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JTW_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

  res.cookie('jwt', token, cookieOptions)

  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  })
  // const profileUrl = `${req.protocol}://${req.get('host')}/users/${newUser._id}`
  const profileUrl = `${req.protocol}://${
    process.env.NODE_ENV === 'development'
      ? 'localhost:3000'
      : 'practice-mern-marko.herokuapp.com'
  }/users/${newUser._id}`
  await new Email(newUser, profileUrl).sendWelcome()
  createSendToken(newUser, 201, res)
})

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  // 1) Check if email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400))
  }

  // 2) Check if user exists & password is correct
  const user = await await User.findOne({ email })
    .populate([
      { path: 'member' },
      { path: 'owner' },
      { path: 'admin' },
      {
        path: 'invitations',
        model: 'Invitation',
        populate: [
          {
            path: 'sender',
            model: 'User',
            select: 'email firstName',
          },
          {
            path: 'receiver',
            model: 'User',
            select: 'email firstName',
          },
          {
            path: 'team',
            model: 'Team',
            select: 'name',
          },
        ],
      },
    ])
    .select('+password')

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401))
  }

  // 3) if everything ok send token
  createSendToken(user, 200, res)
})

export const logout = (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })

  res.status(200).json({
    status: 'success',
  })
}
