import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Team must have name.'],
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Team must have owner.'],
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    admins: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    defaultQuestions: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

teamSchema.virtual('invitations', {
  ref: 'Invitation',
  foreignField: 'team',
  localField: '_id',
  justOne: false,
})

const Team = new mongoose.model('Team', teamSchema)

export default Team
