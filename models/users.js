var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  role: { type: String, required: true, trim: true },
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('Users', schema, 'Users');
