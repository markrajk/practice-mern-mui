import AppError from '../utils/appError.js'

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/"([^"]*)"/)[0]
  const message = `Duplicate fields value: ${value}. Please use another value`
  return new AppError(message, 400)
}

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message)
  const message = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 400)
}

const handleJWTError = () =>
  new AppError('Invalid token, Please log in again!', 401)

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401)

const sendErroDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    console.error('ERROR:', err)

    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    })
  }
  console.error('ERROR:', err)
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  })
}

const sendErrProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      })
    }
    console.error('ERROR:', err)

    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    })
  }
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    })
  }
  console.error('ERROR:', err)

  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Pleas try again later',
  })
}

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErroDev(err, req, res)
  } else if (process.env.NODE_ENV === 'production') {
    //let err = Object.assign(err)
    if (err.name === 'CastError') err = handleCastErrorDB(err)
    if (err.code === 11000) err = handleDuplicateFieldsDB(err)
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err)
    if (err.name === 'JsonWebTokenError') err = handleJWTError()
    if (err.name === 'TokenExpiredError') err = handleJWTExpiredError()
    sendErrProd(err, req, res)
  }
}
