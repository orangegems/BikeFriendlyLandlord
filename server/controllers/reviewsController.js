const db = require("../models/BFLL.js");
const queries = require('../models/queries');

const reviewsController = {};

reviewsController.addReview = async (req, res, next) => {
  const {
    title,
    username,
    overall_rating,
    respect_rating,
    responsiveness_rating,
    tlc,
    personalization,
    bike_friendly,
    pet_friendly,
    description,
    user_id,
    landlord_id,
    address_id,
  } = req.body;

  try {
    const result = await db.query(queries.addReview, [
      title,
      username,
      overall_rating,
      respect_rating,
      responsiveness_rating,
      bike_friendly,
      pet_friendly,
      tlc,
      personalization,
      description,
      user_id,
      landlord_id,
      address_id
    ]);

    return next();
  } catch (error) {
    return next({
      message:
        "Error occured attempting to add review to database in reviewController.addReview",
      log: "Error: " + error,
      status: 500,
    });
  }
};

reviewsController.getReviews = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const result = await db.query(queries.getReview, [userId])
    res.locals.reviews = result.rows;
    next();
  } catch (error) {
    return next({
      message:
        "Error occured attempting to get reviews from database in reviewController.getReviews",
      log: "Error: " + error,
      status: 500,
    });
  }
};

reviewsController.getAddressReviews = async (req, res, next) => {
  if(!req.body.address_id) return next();

  try {
    const {address_id} = req.body;
    const result = await db.query(queries.getAddressReviews, [address_id]);
    res.locals.reviews = result.rows;
    return next();
  } catch (error) {
    return next({
      message:
        "Error occured attempting to get reviews from database in reviewController.getAddressReviews",
      log: "Error: " + error,
      status: 500,
    });
  }
}

reviewsController.getAllLandlordReviews = async (req, res, next) => {
  const { landlordId } = req.params;
  // console.log('landlord id: ',landlord_id)

  try {
    const results = await db.query(queries.getAllReviews, [landlordId]);
    res.locals.landlordReviews = results.rows;
    // console.log('landlord Reviews: ', results);
    return next();
  } catch (error) {
    return next({
      message:
        "Error occured attempting to fetch all landlord reviews from backend in reviewsController.getAllLandlordReviews",
      log: "Error: " + error,
      status: 500,
    });
  }
};

reviewsController.updateReview = async (req, res, next) => {
  const { reviewId, title, description } = req.body;

  try {
    const result = await db.query(queries.updateReview, [reviewId, title, description]);
    console.log(result);
    return next();
  } catch (error) {
    return next({
      message: 'Error attempting to update reviews in the database in reviewsController.updateReview',
      log: 'Error: ' + error,
      status: 500
    });
  }
};

reviewsController.deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;
  
  try {
    await db.query(queries.deleteReview, [reviewId]);
    return next();
  } catch (error) {
    return next({
      message: 'Error attempting to delete post from database in reviewsController.deleteReview',
      log: 'Error: ' + error,
      status: 500
    });
  }
};

module.exports = reviewsController;
