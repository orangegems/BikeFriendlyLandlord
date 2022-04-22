const express = require('express');

const router = express.Router();

const reviewsController = require('../controllers/reviewsController.js');
const sessionController = require('../controllers/sessionController.js');
const landlordController = require('../controllers/landlordController.js');
const addressController = require('../controllers/addressController.js');

router.post(
  '/:landlordId',
  // sessionController.checkSession,
  reviewsController.addReview,
  reviewsController.getAllLandlordReviews,
  landlordController.updateLandlordReviews,
  reviewsController.getAddressReviews,
  addressController.updateAddressReviews,
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

router.get('/addressReviews/:addressId', reviewsController.getAddressReviews, (req, res) => {
  return res.json(res.locals.reviews);
});


router.put('/', reviewsController.updateReview, (req, res) => {
  return res.send('Post updated!');
});

router.delete('/:reviewId', reviewsController.deleteReview, (req, res) => {
  return res.send('Post deleted!');
})

module.exports = router;
