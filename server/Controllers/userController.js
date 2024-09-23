const User = require('../models/userModel');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body
  
    if(!username || !password){
        return next(
            {
                message: 'Both username and password fields are required'
            });
    }

  try {
   const newUser = await User.create({username: username, password: password});
   console.log(newUser);
   return next();
  }catch (error) {
    console.log(error);
    return next({message: 'error creating account! username may be taken'});
  }
};

userController.verifyUser = async (req, res, next) => {
const { username, password } = req.query;

if(!username || !password){return  next({message: 'both username and password fields are required'});}

try {
  const user = await User.findOne({username: username});
  if(user === null){return next({message: 'Username or Password was incorrect'})};
  if(password === user.password){
    console.log(user);
    console.log('login verifyed');
    return next()}
  else{
    return next({message: 'Username or Password was incorrect'});
  }
  
}catch (error) {
  console.log(error);
    return next({message: 'Username or Password was incorrect'});
}

};

module.exports = userController;





