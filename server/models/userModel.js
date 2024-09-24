const mongoose = require('mongoose');

const user = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favPlants: { type: Array}
});




module.exports = mongoose.model('user', user);
