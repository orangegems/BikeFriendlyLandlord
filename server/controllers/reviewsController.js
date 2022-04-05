const db = require('../models/BFLL.js');

const reviewsController = {};

reviewsController.addReview = async (req, res, next) => {
  console.log(req.body)
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
    console.log(result);
    return next();
  } catch (error) {
    return next({
      message:
        'Error occured attempting to add review to database in reviewController.addReview',
      log: 'Error: ' + error,
      status: 500,
    });
  }
};

reviewsController.getReviews = async (req, res, next) => {
  console.log('Entered reviewsController.getReviews');
  try {
    const userId = req.params.userId;
    console.log(userId);

    const query = `
    SELECT * FROM reviews
    WHERE reviews.user_id = $1;
    `;

    const result = db.query(query, [userId])
    console.log(result.rows);
    res.locals.reviews = result.rows;
    next();
  } catch (error) {
    return next({
      message:
        'Error occured attempting to get reviews from database in reviewController.getReviews',
      log: 'Error: ' + error,
      status: 500,
    });
  }
};

module.exports = reviewsController;
