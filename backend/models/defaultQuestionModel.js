import mongoose from 'mongoose'

const defaultQuestionSchema = new mongoose.Schema({
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
  default: {
    type: Boolean,
    default: true,
    enum: ['true'],
  },
})

const DefaultQuestion = new mongoose.model(
  'DefaultQuestion',
  defaultQuestionSchema
)
export default DefaultQuestion
