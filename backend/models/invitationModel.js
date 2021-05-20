import mongoose from 'mongoose'

const invitationSchema = new mongoose.Schema(
  {
    team: {
      type: mongoose.Schema.ObjectId,
      ref: 'Team',
      required: [true, 'Invitation must have team.'],
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Invitation must have receiver.'],
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Invitation must have sender.'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Invitation = mongoose.model('Invitation', invitationSchema)

export default Invitation
