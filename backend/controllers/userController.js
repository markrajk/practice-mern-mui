import User from '../models/userModel.js'
import multer from 'multer'
import sharp from 'sharp'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import {
  getOne,
  updateOne,
  getAll,
  deleteOne,
} from '../utils/handlerFactory.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false)
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

export const uploadUserPhoto = upload.single('photo')

export const resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next()
  req.fileSmall = { ...req.file }

  req.file.filename = `user-${req.user.id}${Date.now()}-lg.jpeg`
  req.fileSmall.filename = `user-${req.user.id}${Date.now()}-sm.jpeg`

  const imgPath =
    process.env.NODE_ENV === 'development'
      ? '../../frontend/public/img/users/'
      : '../../frontend/build/img/users/'

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`${path.join(__dirname, imgPath)}${req.file.filename}`)

  sharp(req.fileSmall.buffer)
    .resize(200, 200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`${path.join(__dirname, imgPath)}${req.fileSmall.filename}`)

  next()
}

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el]
  })
  return newObj
}

export const getMe = (req, res, next) => {
  req.params.id = req.user.id
  next()
}

export const updateMe = catchAsync(async (req, res, next) => {
  console.log(req.body)
  console.log(req.file)
  // 1) Create error is user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    next(
      new AppError(
        'This route is not for pasword updates. Please use /updateMyPassword',
        400
      )
    )
  }

  // 2) Update user document
  const filteredBody = filterObj(
    req.body,
    'firstName',
    'lastName',
    'email',
    'jobTitle',
    'photo'
  )
  if (req.file) filteredBody.photoLg = req.file.filename
  if (req.fileSmall) filteredBody.photoSm = req.fileSmall.filename

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  })
})

// export const getAllUsers = getAll(User, {
//   path: 'member',
//   options: { select: { name: 1 } },
//   // path: 'admin',
//   // options: { select: { name: 1 } },
//   path: 'owner',
//   options: { select: { name: 1 } },
// })
// export const getUser = getOne(User, {
//   path: 'member',
//   options: { select: { name: 1 } },
//   // path: 'admin',
//   // options: { select: { name: 1 } },
//   path: 'owner',
//   options: { select: { name: 1 } },
// })

export const getAllUsers = getAll(User, [
  { path: 'member' },
  { path: 'owner' },
  { path: 'admin' },
  { path: 'invitations' },
])
export const getUser = getOne(User, [
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
export const updateUser = updateOne(User)
export const deleteUser = deleteOne(User)
