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
  sessionController.checkSession,
  sessionController.endSession,
  (req, res) => {
    res.status(200).send();
  }
);

module.exports = router;



// "@babel/core": "^7.17.7",
//     "@babel/preset-env": "^7.16.11",
//     "@babel/preset-react": "^7.16.7",
//     "babel-loader": "^8.2.3",
//     " ": "^6.7.1",
//     "html-webpack-plugin": "^5.5.0",
//     "node-polyfill-webpack-plugin": "^1.1.4",
//     " ": "^2.0.15",
//     "stream-http": "^3.2.0",
//     "style-loader": "^3.3.1",
//     "ts-loader": "^9.2.8",
//     "webpack": "^5.70.0",
//     "webpack-cli": "^4.9.2",
//     "webpack-dev-server": "^4.7.4"