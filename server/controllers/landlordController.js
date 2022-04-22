const db = require("../models/BFLL.js");
const queries = require('../models/queries');

const landlordController = {};

//add landlord controller - check if req body isLandlord, if yes, post landlord; 
landlordController.postLandlord = async (req, res, next) => {
  try {
    console.log('enetered postLandlord')
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
  let landlordReviewCount = res.locals.landlordReviews.length === 0;
  newOverall = landlordReviewCount === 0 ? 0 : newOverall / landlordReviewCount;
  newRespect = landlordReviewCount === 0 ? 0 : newRespect / landlordReviewCount;
  newResponsiveness = landlordReviewCount === 0 ? 0 : newResponsiveness / landlordReviewCount;;
  newBike =
    newBike >= Math.floor(landlordReviewCount / 2) ? true : false;
  newPet =
    newPet >= Math.floor(landlordReviewCount / 2) ? true : false;

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

  try {
    const results = await db.query(queries.getBikeAndPetFriendlyLandlords, [city, bike_friendly, pet_friendly]);
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
