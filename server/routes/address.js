const express = require('express');
const addressController = require('../controllers/addressController.js');

const router = express.Router();

router.get('/uniqueCities', addressController.getUniqueCities, (req, res) => {
    return res.json(res.locals.cities);
})

module.exports = router;