import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Feedback must have team'],
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Feedback must have sender'],
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Feedback must have receiver'],
  },
  category: {
    type: String,
    required: [true, 'Feedback must have category'],
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: 'Question',
    required: [true, ['Answer must have question']],
  },
  answer: {
    type: String,
    required: [true, 'Answer must contain text'],
  },
  rating: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

const Feedback = new mongoose.model('Feedback', feedbackSchema)

export default Feedback
