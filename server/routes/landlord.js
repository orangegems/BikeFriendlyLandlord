const express = require('express');

const router = express.Router();

const landlordController = require('../controllers/landlordController.js');

router.get('/all', landlordController.getAllLandlords, (req, res) => {
  return res.json(res.locals.landlords);
});

router.get('/topFour', landlordController.getTopFour, (req, res) => {
  return res.json(res.locals.topLandlords);
});

router.post('/search', landlordController.searchLandlords, (req, res) => {
  return res.json(res.locals.landlords);
});

router.get('/allAddresses', landlordController.getLandlordsAndAddresses, (req, res) => {
  return res.json(res.locals.landlords);
})

module.exports = router;
