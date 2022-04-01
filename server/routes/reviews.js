const express = require('express');

const router = express.Router();

const reviewController = require('../controllers/reviewsController.js');

router.post('/:landlordId', reviewController.addReview,(req, res) => {
    return res.send('Review added successfully!');
});

module.exports = router;