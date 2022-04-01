const express = require('express');

const router = express.Router();

const landlordController = require('../controllers/landlordController.js');

router.get('/all', landlordController.getAllLandlords,(req, res) => {
    return res.json(res.locals.landlords);
});

router.get('/byCity', landlordController.getLandlordsByCity, (req, res) => {
    return res.json(res.locals.landlords);
});

module.exports = router;