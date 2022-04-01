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

module.exports = landlordController;
