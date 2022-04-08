const express = require('express');

const router = express.Router();

const reviewsController = require('../controllers/reviewsController.js');
const sessionController = require('../controllers/sessionController.js');
const landlordController = require('../controllers/landlordController.js');

router.post(
  '/:landlordId',
  // sessionController.checkSession,
  reviewsController.addReview,
  reviewsController.getAllLandlordReviews,
  landlordController.updateLandlordReviews,
  (req, res) => {
    return res.send('Review added successfully!');
  }
);

router.get(
  '/:userId',
  sessionController.checkSession,
  reviewsController.getReviews,
  (req, res) => {
    const response = {
      reviews: res.locals.reviews
    };
    return res.type('application/json').json(response);
  }
);

router.get('/landlordReviews/:landlordId', reviewsController.getAllLandlordReviews, (req, res) => {
  return res.json(res.locals.landlordReviews);
});

module.exports = router;
