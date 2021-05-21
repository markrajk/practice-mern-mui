import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [true, 'Question must have team'],
  },
  category: {
    type: String,
    enum: ['all', 'peers', 'lead', 'self'],
    default: 'all',
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
})

const Question = new mongoose.model('Question', questionSchema)
export default Question
