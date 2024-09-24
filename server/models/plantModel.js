const mongoose = require('mongoose');

const plant = mongoose.Schema({
  plantId: { type: Number, required: true, unique: true },
  commonName: { type: String, required: true },
  watering: { type: String,},
  // frontend should be aware that this is an object and will have to create a deep clone
  wateringGeneralBenchMark: { type: Object},
  sunlight: { type: Array},
  careGuide: { type: String},
  careLevel: { type: String},
  poisonousToPet: { type: Boolean},
  poisonousToHuman: { type: Boolean},
  imageUrl: { type: String},
  description: { type: String},
  indoor: { type: Boolean}
});





module.exports = mongoose.model('plant', plant);
