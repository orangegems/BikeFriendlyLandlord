const db = require('../models/BFLL.js');
const queries = require('../models/queries');

const addressController = {};

addressController.getUniqueCities = async (req, res, next) => {

    try {
        const results = await db.query(queries.getCity);
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

//Allow landlord to add address
//Edit landlordaddresses table 

//Allow landlord to delete address
//Edit landlordaddresses table 

module.exports = addressController;