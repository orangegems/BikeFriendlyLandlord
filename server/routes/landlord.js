const express = require('express');

const router = express.Router();

const landlordController = require('../controllers/landlordController.js');

router.get('/', landlordController.getAllLandlords,(req, res) => {
    return res.json(res.locals.landlords);
});

module.exports = router;