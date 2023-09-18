// REQUIRES
const Tour = require('../models/tourModel');
const ApiFeatures = require('../utils/ApiFeatures');

exports.cheapest = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price';
  req.query.fields = 'name price ratingsAverage maxGroupSize';
  next();
};

exports.getTours = async (req, res) => {
  try {
    // RUN QUERY
    const features = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limit()
      .pageing();
    const Tours = await features.query;

    // SEND RES
    res.status(200).json({
      status: 'succsess',
      toursCount: Tours.length,
      data: {
        Tours,
      },
    });
  } catch (err) {
    res.status(402).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getOneTour = async (req, res) => {
  try {
    const getOne = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'succsess',
      data: {
        getOne,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.postTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'succsess',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.errors.name.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const update = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: 'succsess',
      data: update,
    });
  } catch (err) {
    res.status(403).json({
      status: 'failed',
      message: err.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'succsess',
      message: `tour with id ${req.params.id} was deleted`,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getStats = async (req, res) => {
  try {
    const result = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: '$duration',
          avgRating: { $avg: '$ratingsAverage' },
          toursNumber: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);

    res.status(200).json({
      status: 'succsess',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.toursByYear = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const tours = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          tourCount: { $sum: 1 },
          names: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          month: 1,
          tourCount: 1,
          names: 1,
          _id: 0,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    res.status(200).json({
      status: 'succsess',
      tours: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};
