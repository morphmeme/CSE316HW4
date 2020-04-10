var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  text: String,
  color: String,
  backgroundColor: String,
  borderColor: String,
  borderThickness: { type: Number, min: 0, max: 111 },
  borderRadius: { type: Number, min: 0, max: 50 },
  padding: { type: Number, min: 0, max: 111 },
  margin: { type: Number, min: 0, max: 111 },

  fontSize: { type: Number, min: 2, max: 111 },
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);