const bcrypt = require('bcryptjs');
require('dotenv').config();

const saltRounds = 10;

const userController = {};

/**
 * hashes the password with bcryptjs and saves the user to the database
 */
userController.createUser = (req, res, next) => {
  console.log('entered userController.createUser');
  // * what data do we need
  const { username, password, name } = req.body; // !

  // ? validate user input

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return next({
        log: `Error in userController.createUser hashing the password -> Error: ${err}`,
        message: {
          err: 'error creating new user',
        },
      });
    }

    /**
     * save user to data base with hashed password
     *
     *
     *
     */
  });
};

userController.verifyUser = (req, res, next) => {
  console.log('entered userController.verifyUser');
  const { username, password } = req.body; // !

  /**
   * search the user in the data base
   *
   *
   *
   */

  //  compare the passmords with bcrypt - return error if passwords don't match (200?)
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      return next({
        log: `Error in userController.verifyUser comparing the passwords -> Error: ${err}`,
        message: {
          err: 'error verifying passwords',
        },
      });
    }
    if (result === false) res.status(401).send('passwords do not match');

    /**
     * Save user to res.locals
     *
     *
     *
     */

    return next();
  });
};



userController.deleteUser = async (req, res, next) => {
  console.log('entered userController.deleteUser');
  /** 
   * Delete user from the database
   * 
   * 
   * 
  */
  return next();
};

module.exports = userController;
