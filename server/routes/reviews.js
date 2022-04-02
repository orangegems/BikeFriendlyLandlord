const express = require('express');

const router = express.Router();

const reviewController = require('../controllers/reviewsController.js');
const sessionController = require('../controllers/sessionController.js');

router.post(
  '/:landlordId',
  sessionController.checkSession,
  reviewController.addReview,
  (req, res) => {
    return res.send('Review added successfully!');
  }
);

router.get(
  '/:userId',
  sessionController.checkSession,
  reviewController.getReviews,
  (req, res) => {
    const response = {
      reviews: res.locals.reviews
    };
    return res.json(response);
  }
);

module.exports = router;
