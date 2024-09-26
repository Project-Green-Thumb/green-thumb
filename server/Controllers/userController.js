const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      log: 'Client sent invalid req body.',
      status: 400,
      message: 'Both username and password fields are required.',
    });
  }

  try {
    const hashPass = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      username: username,
      password: hashPass,
    });
    res.locals.newUser = newUser;
    return next();
  } catch (error) {
    //we can check here if the mongoDB error code matches their duplicate key error
    if (error.code === 11000){}
    return next({
      log: 'Duplicate username error',
      status: 409,
      message: 'Error creating account! Username may be taken.',
    });
  }
  return next ({
    log: error,
    status:500, 
    message: 'Server error'
  })
  }


userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      log: 'Client sent invalid request body',
      status: 400,
      message: 'Both username and password fields are required.',
    });
  }
  try {
    const user = await User.findOne({ username: username });
    if (user === null) {
      return next({
        log: 'Client sent invalid req body.',
        status: 400,
        message: 'Invalid credentials.',
      });
    } 
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
          return next({
            log: 'Invalid credentials',
            status: 400,
            message: 'Invalid credentials',
          })
        }

        const token =  jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.locals.token = token;

        return next();

  } catch (error) {
    console.log(error);
    return next({
      log: `Error in user verification ${error}`,
      message: 'Internal server error.',
    });
  }
};

module.exports = userController;
