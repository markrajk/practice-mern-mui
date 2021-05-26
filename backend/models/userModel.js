import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'User must have first name.'],
    },
    lastName: {
      type: String,
      required: [true, 'User must have last name.'],
    },
    email: {
      type: String,
      required: [true, 'User must have a email address.'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    jobTitle: String,
    password: {
      type: String,
      required: [true, 'User must have a password.'],
      minLenth: 8,
      select: false,
    },
    photoLg: {
      type: String,
      default: 'default.jpeg',
    },
    photoSm: {
      type: String,
      default: 'default.jpeg',
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})

// userSchema.virtual('teams', {
//   ref: 'Team',
//   foreignField: 'members',
//   localField: '_id',
//   justOne: false,
// })

userSchema.virtual('member', {
  ref: 'Team',
  foreignField: 'members',
  localField: '_id',
  justOne: false,
})

userSchema.virtual('admin', {
  ref: 'Team',
  foreignField: 'admins',
  localField: '_id',
  justOne: false,
})

userSchema.virtual('owner', {
  ref: 'Team',
  foreignField: 'owner',
  localField: '_id',
  justOne: false,
})

userSchema.virtual('invitations', {
  ref: 'Invitation',
  foreignField: 'receiver',
  localField: '_id',
  justOne: false,
  populate: {
    path: 'sender',
  },
})

// userSchema.index({ firstName: 'text', lastName: 'text', email: 'text' })
userSchema.index({ firstName: 1, lastName: 1, email: 1 }, { unique: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)

  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)

export default User
