const express = require('express');
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

// post -> login
router.post(
  '/login',
  userController.verifyUser,
  sessionController.startSession,
  (req, res) => {
    const response = res.locals.user;
    res.status(200).json(response);
  }
);

// post -> signup
router.post(
  '/signup',
  userController.createUser,
  sessionController.startSession,
  (req, res) => {
    const response = res.locals.user;
    res.status(200).json(response);
  }
);

// post -> logout
router.post(
  '/logout',
  sessionController.endSession,
  (req, res) => {
    res.status(200).send();
  }
);

// just if the user is logged in
router.post('/check', sessionController.checkSession, (req,res) => {
  res.sendStatus(200);
})

module.exports = router;

