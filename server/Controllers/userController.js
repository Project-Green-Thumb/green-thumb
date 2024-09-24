const User = require('../models/userModel');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      status: 400,
      message: 'Both username and password fields are required.',
    });
  }

  try {
    const newUser = await User.create({
      username: username,
      password: password,
    });

    return next();
  } catch (error) {
    return next({
      log: error,
      status: 500,
      message: 'Error creating account! Username may be taken.',
    });
  }
};

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
        status: 400,
        message: 'Invalid credentials.',
      });
    }
    if (password !== user.password) {
      return next({
        status: 400,
        message: 'Invalid credentials.',
      });
    } else if (password === user.password) {
      return next();
    }
  } catch (error) {
    console.log(error);
    return next({
      log: `Error in user verification ${error}`,
      message: 'Internal server error.',
    });
  }
};

module.exports = userController;
