var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  _id: { type: String, required: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, required: true, trim: true }
});

module.exports = mongoose.model('Countries', schema, 'Countries');
