const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    favPlants: { type: Array },
  },
  { collection: 'users' }
);

module.exports = mongoose.model('User', userSchema);
