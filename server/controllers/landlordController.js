const db = require("../models/BFLL.js");

const landlordController = {};

landlordController.getAllLandlords = async (req, res, next) => {
  const queryString = `SELECT * FROM landlords;`;
  try {
    const results = await db.query(queryString);
    res.locals.landlords = results.rows;
    return next();
  } catch (error) {
    return next({
      message:
        "An error occured attempting to query all landlords in landlordController.getAllLandlords",
      log: "Error: " + error,
      status: 500,
    });
  }
};

landlordController.getLandlordsByCity = async (req, res, next) => {
  const queryString = `
        SELECT landlords.*, addresses.city, addresses.state 
        FROM landlords 
        INNER JOIN addresses ON landlords._id = addresses.landlord_id
        WHERE addresses.city = $1;
    `;

  const { city } = req.body;
  try {
    const results = await db.query(queryString, [city]);
    res.locals.landlords = results.rows;
    return next();
  } catch (error) {
    return next({
      message:
        "An error occured attempting to fetch landlords by city in landlordController.getLandlordsByCity",
      log: "Error: " + error,
      status: 500,
    });
  }
};

landlordController.getTopFour = async (req, res, next) => {
  const queryString = `SELECT landlords.*, addresses.city, addresses.state FROM landlords LEFT OUTER JOIN addresses on landlords._id = addresses.landlord_id ORDER BY overall_rating DESC LIMIT 4;`;

  try {
    const results = await db.query(queryString);
    res.locals.topLandlords = results.rows;
    return next();
  } catch (error) {
    return next({
      message:
        "An error occured attempting to fetch the top 4 landlords in landlordController.getTopFour",
      log: "Error: " + error,
      status: 500,
    });
  }
};

landlordController.updateLandlordReviews = async (req, res, next) => {
  const {
    overall_rating,
    respect_rating,
    responsiveness_rating,
    bike_friendly,
    pet_friendly,
    description,
    user_id,
    landlord_id,
  } = req.body;
}

module.exports = landlordController;
