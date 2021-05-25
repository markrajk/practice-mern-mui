import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import AppError from './utils/appError.js'
import globalErrorHandler from './controllers/errorController.js'

import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import teamRoutes from './routes/teamRoutes.js'
import invitationRoutes from './routes/invitationRoutes.js'
import chartRoutes from './routes/chartRoutes.js'
import feedbackRoutes from './routes/feedbackRoutes.js'
import defaultQuestionRoutes from './routes/defaultQuestionRoutes.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Serving static files
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(cookieParser())

// Development login
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}

// Middleware to log cookies and time of req
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString()
//   console.log(req.cookies)
//   next()
// })

app.use('/api/v1/users/', userRoutes)
app.use('/api/v1/posts/', postRoutes)
app.use('/api/v1/teams/', teamRoutes)
app.use('/api/v1/invitations/', invitationRoutes)
app.use('/api/v1/charts/', chartRoutes)
app.use('/api/v1/feedbacks/', feedbackRoutes)
app.use('/api/v1/defaultQuestions/', defaultQuestionRoutes)

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`))
})

app.use(globalErrorHandler)

export default app
