const db = require("../models/BFLL.js");

const reviewsController = {};

reviewsController.addReview = async (req, res, next) => {
  const {
    title,
    username,
    overall_rating,
    respect_rating,
    responsiveness_rating,
    bike_friendly,
    pet_friendly,
    description,
    user_id,
    landlord_id,
  } = req.body;

  const queryString = `
        INSERT INTO reviews (title, username, overall_rating, respect_rating, responsiveness_rating, bike_friendly, pet_friendly, description, user_id, landlord_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
    `;

  try {
    const result = await db.query(queryString, [
      title,
      username,
      overall_rating,
      respect_rating,
      responsiveness_rating,
      bike_friendly,
      pet_friendly,
      description,
      user_id,
      landlord_id,
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

    const query = `
    SELECT * FROM reviews
    WHERE user_id = $1;
    `;

    const result = await db.query(query, [userId])
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

reviewsController.getAllLandlordReviews = async (req, res, next) => {
  const { landlordId } = req.params;
  // console.log('landlord id: ',landlord_id)
  const queryString = `
    SELECT * FROM reviews 
    WHERE landlord_id = $1;
  `;

  try {
    const results = await db.query(queryString, [landlordId]);
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

module.exports = reviewsController;
