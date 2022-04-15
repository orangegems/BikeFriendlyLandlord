const bcrypt = require('bcryptjs');
require('dotenv').config();
const db = require('../models/BFLL.js');
const queries = require('../models/queries');

const saltRounds = 10;

const userController = {};

/**
 * hashes the password with bcryptjs and saves the user to the database
 */
userController.createUser = async (req, res, next) => {
  console.log('entered userController.createUser');
  try {
    const {
      username,
      password,
      firstname,
      lastname,
      isLandlord,
      email,
      landlordId,
    } = req.body;

    // ? validate user input

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    /**
     * if the new user is a landlord, add the new landlord to the 'landlord' table
     * before adding the user to the users table with landlord_id
     */
    // if (landlordId && !isTenant) {
    //   const landlordQueryString = `
    //   INSERT INTO users (first_name, last_name, full_name,is_verified)
    //   VALUES ($1, $2, $3, $4);
    //   `;
    //   const landlordValues = [
    //     firstname,
    //     lastname,
    //     firstname + ' ' + lastname,
    //     true,
    //   ];
    //   const landlordResult = await db.query(
    //     landlordQueryString,
    //     landlordValues
    //   );
    //   console.log(landlordResult.rows);
    // }

    /**
     * database query to add the new user to the users table
     */
    const userQueryString = `
    INSERT INTO users (first_name, last_name, full_name, username, email, password, is_landlord, landlord_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `;
    const userValues = [
      firstname,
      lastname,
      firstname + ' ' + lastname,
      username,
      email, 
      hashedPassword,
      isLandlord,
      landlordId,
    ];
    const userResult = await db.query(userQueryString, userValues);
    delete userResult.rows[0].password;
    res.locals.user = userResult.rows[0];

    next();
  } catch (err) {
    return next({
      log: `Error in userController.createUser adding new user -> Error: ${err}`,
      message: {
        err: 'Error creating new user',
      },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  console.log('entered userController.verifyUser');
  try {
    const { username, password } = req.body;

    const result = await db.query(queries.verifyUser, [username]);

    const hash = result.rows[0].password;

    //  compare the passmords with bcrypt - return error if passwords don't match (200?)
    const match = await bcrypt.compare(password, hash);
    if (!match) res.status(401).send('passwords do not match');

    delete result.rows[0].password;
    res.locals.user = result.rows[0];

    return next();
  } catch (err) {
    return next({
      log: `Error in userController.verifyUser verifying the user -> Error: ${err}`,
      message: {
        err: 'Error verifying user',
      },
    });
  }
};

// ! not tested
userController.deleteUser = async (req, res, next) => {
  console.log('entered userController.deleteUser');
  try {
    // pull username form cookie

    const values = [
      /** userId */
    ];
    const result = await db.query(queries.deleteUser, values);
    console.log(result.rows);

    // res.locals.user = result.rows.something // !

    return next();
  } catch (err) {
    return next({
      log: `Error in userController.deleteUser removing the user -> Error: ${err}`,
      message: {
        err: 'Error deleting user',
      },
    });
  }
};

userController.getUserData = async (req,res,next) => {
  try {
    const userId = res.locals.user;
    console.log(userId)

    const result = await db.query(queries.getUser, [userId._id]);
    console.log(result.rows[0]);

    delete result.rows[0].password;

    res.locals.userData = result.rows[0];

    return next();
  } catch (err) {
    return next({
      log: `Error in userController.getUserData getting user data -> Error: ${err}`,
      message: {
        err: 'Error getting data',
      },
    });
  }
}

module.exports = userController;
