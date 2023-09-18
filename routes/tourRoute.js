const express = require('express');
const TourController = require('./../controllers/tourController');

const routes = express.Router();

routes
  .route('/top/top-5-cheap')
  .get(TourController.cheapest, TourController.getTours);

routes.route('/stats/get-stats').get(TourController.getStats);

routes.route('/tours-by-year/:year').get(TourController.toursByYear);

routes
  .route('/:id')
  .get(TourController.getOneTour)
  .patch(TourController.updateTour)
  .delete(TourController.deleteTour);

routes.route('/').get(TourController.getTours).post(TourController.postTour);

module.exports = routes;
