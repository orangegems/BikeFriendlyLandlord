const bcrypt = require("bcryptjs");
require("dotenv").config();
const db = require("../models/BFLL.js");
const queries = require("../models/queries");

const saltRounds = 10;

const userController = {};

/**
 * hashes the password with bcryptjs and saves the user to the database
 */
userController.createUser = async (req, res, next) => {
  console.log("entered userController.createUser");
  try {
    const {
      username,
      password,
      first_name,
      last_name,
      is_landlord,
      is_company,
      company,
      email,
    } = req.body;

    // ? validate user input

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    /**
     * database query to add the new user to the users table
     */
    const userValues = [
      first_name,
      last_name,
      first_name + " " + last_name,
      username,
      email,
      hashedPassword,
      is_company,
      company,
      is_landlord,
    ];
    const userResult = await db.query(queries.createUser, userValues);

    delete userResult.rows[0].password;
    res.locals.user = user.rows[0];
    next();
  } catch (err) {
    return next({
      log: `Error in userController.createUser adding new user -> Error: ${err}`,
      message: {
        err: "Error creating new user",
      },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  console.log("entered userController.verifyUser");
  try {
    const { username, password } = req.body;

    const result = await db.query(queries.getVerifiedUser, [username]);

    const hash = result.rows[0].password;

    //  compare the passmords with bcrypt - return error if passwords don't match (200?)
    const match = await bcrypt.compare(password, hash);
    if (!match) res.status(401).send("passwords do not match");

    delete result.rows[0].password;
    res.locals.user = result.rows[0];

    return next();
  } catch (err) {
    return next({
      log: `Error in userController.verifyUser verifying the user -> Error: ${err}`,
      message: {
        err: "Error verifying user",
      },
    });
  }
};

// ! not tested
userController.deleteUser = async (req, res, next) => {
  console.log("entered userController.deleteUser");
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
        err: "Error deleting user",
      },
    });
  }
};

userController.getUserData = async (req, res, next) => {
  console.log("entered userController.getUserData");
  try {
    res.locals.user = res.locals.user ? res.locals.user._id : null;
    console.log(res.locals.user);
    const userId = res.locals.user || req.params.landlordId || req.body.user;
    // console.log(userId);

    const result = await db.query(queries.getUserData, [userId]);


    console.log(result.rows[0]);


    const resultId = await db.query(queries.getLandlordId, [userId]);

    if (resultId.rows[0]) {
      result.rows[0].landlord_id = resultId.rows[0]._id;
    }

    console.log("here in getUserData");
    // console.log(result.rows[0]);

    delete result.rows[0].password;

    res.locals.userData = result.rows[0];
    console.log("get user data success");
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.getUserData getting user data -> Error: ${err}`,
      message: {
        err: "Error getting data",
      },
    });
  }
};

module.exports = userController;
