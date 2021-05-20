import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import APIFeatures from '../utils/apiFeatures.js'

export const getAll = (Model, popOptions) =>
  catchAsync(async (req, res) => {
    let filter = {}
    // console.log(req.params.userId, 'FACTORY req.params.userId')
    // console.log(req.user, 'FACTORY req.user')
    if (req.params.userId && req.user)
      filter = {
        // $or: [{ user: req.params.userId }],
        $or: [{ user: req.params.userId }, { receiver: req.params.userId }],
        // user: req.params.userId,
      }

    if (req.params.ownerId && req.user) filter = { owner: req.params.ownerId }

    //EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .search()

    const document = await features.query.populate(popOptions)

    res.status(200).json({
      status: 'success',
      results: document.length,
      data: {
        data: document,
      },
    })
  })

export const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id)
    if (popOptions) query = query.populate(popOptions)
    const document = await query
    if (!document) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: document,
      },
    })
  })

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body)

    res.status(201).send({
      status: 'success',
      data: {
        data: document,
      },
    })
  })

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.body)
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!document) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: document,
      },
    })
  })

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id)

    if (!document) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(204).json({
      status: 'success',
      data: null,
    })
  })
