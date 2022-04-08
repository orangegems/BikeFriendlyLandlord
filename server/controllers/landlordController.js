const db = require("../models/BFLL.js");

const landlordController = {};

landlordController.getById = async (req, res, next) => {
  const queryString = `SELECT * FROM landlords WHERE _id = $1`;

  try {
    const results = await db.query(queryString, [req.params.landlord_id]);
    res.locals.landlord = results.rows[0];
    return next();
  } catch (error) {
    return next({
      message: 'Error occured attempting to get landlord from database in landlordController.getById',
      log: 'Error: ' + error,
      status: 500
    });
  }
};

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

landlordController.getTopFour = async (req, res, next) => {
  const queryString = `SELECT landlords.*, addresses.city, addresses.state FROM landlords 
                       LEFT OUTER JOIN addresses on landlords._id = addresses.landlord_id 
                       WHERE landlords.overall_rating != 'NaN'
                       ORDER BY overall_rating DESC 
                       LIMIT 4;`

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
  const { landlord_id } = req.body;

  let newOverall = newRespect = newResponsiveness = newBike = newPet = 0;
  // console.log('landlord Reviews: ', res.locals.landlordReviews);
  // add up total for each review category
  res.locals.landlordReviews.forEach(review => {
    newOverall += Number(review.overall_rating);
    newRespect += Number(review.respect_rating);
    newResponsiveness += Number(review.responsiveness_rating);
    if (review.bike_friendly) newBike += 1;
    if (review.pet_friendly) newPet += 1;
  });

  // calculate new average for each review category
  newOverall /= res.locals.landlordReviews.length;
  newRespect /= res.locals.landlordReviews.length;
  newResponsiveness /= res.locals.landlordReviews.length;
  newBike = (newBike >= Math.floor(res.locals.landlordReviews.length / 2) ? true : false);
  newPet = (newPet >= Math.floor(res.locals.landlordReviews.length / 2) ? true : false);

  // push new values to database
  const queryString = `
    UPDATE landlords
    SET overall_rating = $1, respect_rating = $2, responsiveness_rating = $3, bike_friendly = $4, pet_friendly = $5
    WHERE _id = $6;
  `;
  try {
    await db.query(queryString, [newOverall, newRespect, newResponsiveness, newBike, newPet, landlord_id]);
    return next();
  } catch (error) {
    return next({
      message: 'An error occured attempting to update database with new ratings in landlordController.updateLandlordReviews',
      log: 'Error: ' + error,
      status: 500
    });
  }
};

landlordController.searchLandlords = async (req, res, next) => {
  const { city, bike_friendly, pet_friendly } = req.body;
  let queryString = `
    SELECT landlords.*, addresses.street_num, addresses.street, addresses.city, addresses.state, addresses.zip_code FROM landlords 
    INNER JOIN addresses ON landlords._id = addresses.landlord_id
    WHERE addresses.city = $1
  `;

  if (bike_friendly) queryString += ' AND bike_friendly = true';
  if (pet_friendly) queryString += ' AND pet_friendly = true';
  queryString += ';';

  try {
    const results = await db.query(queryString, [city]);
    res.locals.landlords = results.rows;
    return next();
  } catch (error) {
    return next({
      message: 'An error occured attempting to search landlords in landlordController.searchLandlords',
      log: 'Error: ' + error,
      status: 500
    });
  }
};

landlordController.getLandlordsAndAddresses = async (req, res, next) => {
  try {
    const queryString = `
    SELECT l.*, a.city, a.street_num, a.street, a.state, a.zip_code, a.landlord_id FROM landlords l
    INNER JOIN addresses a ON l._id = a.landlord_id;
    `;

    const results = await db.query(queryString);
    res.locals.landlords = results.rows;
    return next();
  } catch (error) {
    return next({
      message: 'An error occured attempting to search landlords in landlordController.searchLandlords',
      log: 'Error: ' + error,
      status: 500
    });
  }
}

module.exports = landlordController;
