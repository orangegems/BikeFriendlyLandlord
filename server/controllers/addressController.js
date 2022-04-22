const { tabClasses } = require('@mui/material');
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
addressController.postAddress = async(req, res, next) => {
    const {
        street_num, street, apt_num, city, state, zip_code, bike_friendly, pet_friendly, dog_friendly, dog_breed_restriction, dog_size_max_lbs, quiet_hour_start, quiet_hour_end, overnight_guests, smoker_friendly, building_type, beds, baths, price, landlord_id
    } = req.body;
    try {
        const results = await db.query(queries.postAddress, [street_num, street, apt_num, city, state, zip_code, bike_friendly, pet_friendly, dog_friendly, dog_breed_restriction, dog_size_max_lbs, quiet_hour_start, quiet_hour_end, overnight_guests, smoker_friendly, building_type, beds, baths, price, landlord_id]);
        return next();
    } catch (error) {
        return next({
            message: 'Error occured attempting to add address',
            log: 'Error in postAddress' + error,
            status: 500
        });
    }
}

//Allow landlord to delete address
addressController.deleteAddress = async(req, res, next)=> {
    try {
        await db.query();
        return next();
    } catch (error){
        return next({
            message: 'Error occured attempting to delete address',
            log: 'Error in deleteAddress' + error,
            status: 500
        });
    }
}

module.exports = addressController;