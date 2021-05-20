import mongoose from 'mongoose'
import dotenv from 'dotenv'

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

dotenv.config()

import app from './app.js'

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection succesfull')
  })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server is running in${process.env.NODE_ENV} mode on port ${PORT}`
  )
})

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})
