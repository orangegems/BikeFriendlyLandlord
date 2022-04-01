const bcrypt = require('bcryptjs');
require('dotenv').config();
const db = require('../models/BFLL.js');

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
      isTenant,
      email,
      landlordId,
    } = req.body;

    // ? validate user input

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    /**
     * if the new user is a landlord, add the new landlord to the 'landlord' table
     * before adding the user to the users table with landlord_id
     */
    if (!landlordId && !isTenant) {
      const landlordQueryString = `
      INSERT INTO users (first_name, last_name, full_name,is_verified) 
      VALUES ($1, $2, $3, $4);
      `;
      const landlordValues = [
        firstname,
        lastname,
        firstname + ' ' + lastname,
        true,
      ];
      const landlordResult = await db.query(
        landlordQueryString,
        landlordValues
      );
      console.log(landlordResult.rows);
    }

    /**
     * database query to add the new user to the users table
     */
    const userQueryString = `
    INSERT INTO users (first_name, last_name, full_name, username, email, password, is_landlord, landlord_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;
    const userValues = [
      firstname,
      lastname,
      firstname + ' ' + lastname,
      username,
      email,
      hashedPassword,
      !isTenant,
      landlordId,
    ];
    const userResult = await db.query(userQueryString, userValues);
    console.log('here')
    console.log(userResult.rows);

    /**
     * Save user to res.locals
     *
     *
     *
     */

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

    const queryString = `
    SELECT * FROM users
    WHERE users.username = $1
    `;
    const result = await db.query(queryString, [username]);
    console.log(result.rows)

    // const hash = result.rows.something // !

    //  compare the passmords with bcrypt - return error if passwords don't match (200?)
    const match = await bcrypt.compare(password, hash);
    if (!match) res.status(401).send('passwords do not match');

    // res.locals.user = result.rows.something // !

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

userController.deleteUser = async (req, res, next) => {
  console.log('entered userController.deleteUser');
  try {
    // pull username form cookie

    const queryString = `
    Delete FROM users
    WHERE users._id = $1
    `;
    const values = [/** userId */];
    const result = await db.query(queryString, values);
    console.log(result.rows)

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

module.exports = userController;
