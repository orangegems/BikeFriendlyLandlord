const db = require('../models/BFLL.js');

const addressController = {};

addressController.getUniqueCities = async (req, res, next) => {
    const queryString = `SELECT DISTINCT city FROM addresses;`;

    try {
        const results = await db.query(queryString);
        res.locals.cities = results.rows;
        return next();
    } catch (error) {
        return next({
            message: 'Error occured attempting to fetch unique list of cities in addressController.getUniqueCities',
            log: 'Error: ' + error,
            status: 500
        });
    }
};

module.exports = addressController;