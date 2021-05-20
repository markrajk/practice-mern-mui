import mongoose from 'mongoose'

const chartSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Chart must have title.'],
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Chart must have owner.'],
  },
  datasets: [
    {
      label: {
        type: String,
        required: [true, 'Dataset must contain label.'],
      },
      data: {
        months: {
          type: Array,
          required: [true, 'Dataset must contain array of data.'],
        },
        weeks: {
          type: Array,
          required: [true, 'Dataset must contain array of data.'],
        },
      },
    },
  ],
  settings: {
    type: Array,
    default: ['months'],
  },
})

const Chart = new mongoose.model('Chart', chartSchema)
export default Chart
