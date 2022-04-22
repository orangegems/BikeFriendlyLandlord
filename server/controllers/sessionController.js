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
  // console.log('req.cookies: ', req.cookies)
  // check if the cookie exists. return status code 401 if it doesn't
  
  if (!jwtToken) {
    const err = {
      log: 'User has no active session.',
      status: 401,
      message: { err: 'User has no active session' },
    };
    return next(err);
  }
  
  const decryptedToken = jwt.verify(jwtToken, process.env.jwts, {
    complete: true,
  });
  
  // check if the jxt verified. return status code 401 if it doesn't. 
  if (!decryptedToken) {
    res.clearCookie('ssid');
    return res.status(401).send();
  }

  res.locals.user = decryptedToken.payload;
  console.log('session check success')
  next();
};

/**
 * creates a new jwt with the userId encrypted, saves it as a cookie named 'ssid'
 */
sessionController.startSession = (req, res, next) => {
  console.log('entered sessionController.startSession');
  const userInfo = res.locals.user;

  const jwtData = {
    _id: userInfo._id,
    username: userInfo.username,
  }
  // create the json web token
  const jwtToken = jwt.sign(
    jwtData, 
    process.env.jwts,
    {
      expiresIn: 7200000, // 2 hours
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
