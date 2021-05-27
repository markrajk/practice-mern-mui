import Team from '../models/teamModel.js'
import User from '../models/userModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

import {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne,
} from '../utils/handlerFactory.js'

export const getAllTeams = getAll(Team, [
  { path: 'members' },
  { path: 'admins' },
  { path: 'owner' },
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
export const getTeam = getOne(Team, [
  { path: 'members' },
  { path: 'admins' },
  { path: 'owner' },
  {
    path: 'invitations',
    model: 'Invitation',
    populate: [
      {
        path: 'receiver',
        model: 'User',
        select: 'email firstName lastName',
      },
    ],
  },
])
export const createTeam = createOne(Team)
export const updateTeam = updateOne(Team)
export const deleteTeam = deleteOne(Team)

export const joinTeam = catchAsync(async (req, res, next) => {
  const team = await Team.findByIdAndUpdate(req.params.id, {
    $push: { members: req.user },
  })

  if (!team) {
    return next(new AppError('No team found with that ID', 404))
  }

  res.status(201).send({
    status: 'success',
    data: {
      data: team,
    },
  })
})

export const createDemoTeam = catchAsync(async (req, res, next) => {
  const demoUsers = await User.find({ role: 'demo' })
  const team = await Team.create({
    ...req.body,
    name: `${req.user.firstName}'s Demo Team`,
    members: demoUsers,
  })

  res.status(201).send({
    status: 'success',
    data: {
      data: team,
    },
  })
})
