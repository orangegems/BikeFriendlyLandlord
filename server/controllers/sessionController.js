const jwt = require('jsonwebtoken');
require('dotenv').config();

const sessionController = {};

/**
 * Checks if the session cookie 'SSID' is valid and saves the userId to res.locals for future queries
 * 
 */
sessionController.checkSession = (req, res, next) => {
  console.log('entered sessionController.checkSession');
  const jwtToken = req.cookies.ssid;
  // check if the cookie exists. return status code 401 if it doesn't
  if (!jwtToken) return res.status(401).send();
  const payload = jwt.verify(jwtToken, process.env.jwts, {
    complete: true,
  });
  // check if the jxt verified. return status code 401 if it doesn't
  if (!payload) return res.status(401).send();

  // ! saving userId to res.locals. need to configure with new database
  // res.locals.userId = payload.payload.userId;
  next();
};

/**
 * creates a new jwt with the userId encrypted, saves it as a cookie named 'ssid'
 */
sessionController.startSession = (req, res, next) => {
  console.log('entered sessionController.startSession');
  // create the json web token
  const jwtToken = jwt.sign(
    { /** userId: res.locals.user._id */ }, // ! encrypting userId in jwt. need to configure with new database
    process.env.jwts,
    {
      expiresIn: 30000000, // a long time
    }
  );
  // save the json web token as a cookie named 'ssid'
  res.cookie('ssid', jwtToken, {
    httpOnly: true,
  });
  next();
};

sessionController.endSession = (req, res, next) => {
  console.log('entered sessionController.endSession');
  // clear the cookie serverside 
  res.clearCookie('ssid');
  next();
};

module.exports = sessionController;
