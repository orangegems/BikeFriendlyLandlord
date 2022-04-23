const db = require("../models/BFLL.js");
const queries = require('../models/queries');

const landlordController = {};

landlordController.postLandlord = async (req, res, next)=>{
  try {
    console.log('entered postLandlord')
    await db.query(queries.postLandlord, [res.locals.user._id]);
    return next();
  } catch (error) {
    return next({
      message:
        "Error occured attempting to get landlord from database in landlordController.postLandlord",
      log: "Error: " + error,
      status: 500,
    });
  }
}

landlordController.getById = async (req, res, next) => {
  
  try {
    const results = await db.query(queries.getLandlord, [req.params.landlord_id]);
    res.locals.landlord = results.rows[0];
    return next();
  } catch (error) {
    return next({
      message:
        "Error occured attempting to get landlord from database in landlordController.getById",
      log: "Error: " + error,
      status: 500,
    });
  }
};

landlordController.getAllLandlords = async (req, res, next) => {

  try {
    const results = await db.query(queries.getAllLandlords);
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
 
  try {
    const results = await db.query(queries.getTopFourLandlords);
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

  let newOverall = (newRespect = newResponsiveness = newBike = newPet = 0);
  // console.log('landlord Reviews: ', res.locals.landlordReviews);
  // add up total for each review category
  res.locals.landlordReviews.forEach((review) => {
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
  newBike =
    newBike >= Math.floor(res.locals.landlordReviews.length / 2) ? true : false;
  newPet =
    newPet >= Math.floor(res.locals.landlordReviews.length / 2) ? true : false;

  // push new values to database
  try {
    await db.query(queries.updateLandlordRating, [
      newOverall,
      newRespect,
      newResponsiveness,
      landlord_id,
    ]);
    return next();
  } catch (error) {
    return next({
      message:
        "An error occured attempting to update database with new ratings in landlordController.updateLandlordReviews",
      log: "Error: " + error,
      status: 500,
    });
  }
};

landlordController.searchLandlords = async (req, res, next) => {
  const { city, bike_friendly, pet_friendly } = req.body;

  if (bike_friendly) queries.getBikeAndPetFriendlyLandlords += " AND bike_friendly = true";
  if (pet_friendly) queries.getBikeAndPetFriendlyLandlords += " AND pet_friendly = true";
  queries.getBikeAndPetFriendlyLandlords += ";";

  try {
    const results = await db.query(queries.getBikeAndPetFriendlyLandlords, [city]);
    res.locals.landlords = results.rows;
    return next();
  } catch (error) {
    return next({
      message:
        "An error occured attempting to search landlords in landlordController.searchLandlords",
      log: "Error: " + error,
      status: 500,
    });
  }
};

landlordController.getLandlordsAndAddresses = async (req, res, next) => {
  try {
    const results = await db.query(queries.getLandlordsAndAddresses);
    res.locals.landlords = results.rows;
    return next();
  } catch (error) {
    return next({
      message:
        "An error occured attempting to search landlords in landlordController.searchLandlords",
      log: "Error: " + error,
      status: 500,
    });
  }
};

module.exports = landlordController;
