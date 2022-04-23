const express = require('express');
const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController.js')



const router = express.Router();

router.get('/getUser', sessionController.checkSession, userController.getUserData, (req,res) => {
  
  res.status(200).json(res.locals.userData);
})

router.get('/getUserById/:landlordId', userController.getUserData, (req,res)=>{
  return res.status(200).json(res.locals.userData);
})

module.exports = router;