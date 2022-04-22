const express = require('express');
const addressController = require('../controllers/addressController.js');

const router = express.Router();

router.get('/uniqueCities', addressController.getUniqueCities, (req, res) => {
    return res.json(res.locals.cities);
})

router.get('/:addressId', addressController.getAddress, (req, res) => {
    return res.json(res.locals.address);
})

router.get('/', addressController.getAddresses, (req, res) => {
    return res.json(res.locals.addresses);
})

router.get('/byLandlord/:landlordId', addressController.getAddressesByLandlord, (req, res) => {
    return res.json(res.locals.addresses);
})

router.post('/', addressController.postAddress, (req, res) => {
    return res.json('post successful');
})

router.delete('/:addressId', addressController.deleteAddress, (req, res) => {
    return res.json('delete successful');

})

module.exports = router;