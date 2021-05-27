import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Question must have team'],
  },
  category: {
    type: String,
    enum: ['subordinate', 'peers', 'supervisor', 'self'],
    default: 'subordinate',
    required: [true, 'Question must have a category'],
  },
  type: {
    type: String,
    enum: ['text', 'rating'],
    default: 'text',
    required: [true, 'Question must have a type'],
  },
  question: {
    type: 'String',
    required: [true, 'Question must have text'],
  },
  answered: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  order: Number,
  default: {
    type: Boolean,
    default: false,
  },
})

const Question = new mongoose.model('Question', questionSchema)
export default Question
