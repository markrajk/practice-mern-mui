import { promisify } from 'util'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import Team from '../models/teamModel.js'

export const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it exists
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.ss.jwt) {
    token = req.ss.jwt
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    )
  }
  // 2) Verification  token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    )
  }

  // 4) Check if user changed password after the toke was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError('User recently changed password! Please log in again.', 401)
  //   )
  // }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser
  next()
})

export const restrictToTeamRoles = (...roles) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.teamId || req.params.id
    const team = await Team.findById(id)

    if (!team) {
      return next(new AppError('There is no team with that id', 403))
    }

    if (
      roles.includes('owner') &&
      team.owner.toString() === req.user._id.toString()
    ) {
      return next()
    }
    if (roles.includes('admin') && team.admins.includes(req.user._id)) {
      return next()
    }
    if (roles.includes('member') && team.members.includes(req.user._id)) {
      return next()
    }

    return next(
      new AppError('You do not have permission to perform this action', 403)
    )
  })

export const setUserIds = (req, res, next) => {
  if (req.user) req.body.user = req.user.id
  next()
}

// export const setTeamIds = (req, res, next) => {
//   if (req.params.teamId) req.body.team = req.params.teamId
//   next()
// }

export const setOwnerIds = (req, res, next) => {
  if (!req.body.user) req.body.owner = req.user.id
  next()
}

export const setReceiverIds = (req, res, next) => {
  if (req.params.id) req.body.receiver = req.params.id
  next()
}

export const setTeamIds = (req, res, next) => {
  if (req.params.teamId) {
    req.body.team = req.params.teamId
    return next()
  } else if (req.params.id) {
    req.body.team = req.params.teamId
    return next()
  }
  next()
}

export const setSenderIds = (req, res, next) => {
  if (req.user) req.body.sender = req.user.id
  next()
}
