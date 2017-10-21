var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  img: { type: String, trim: true },
  price: { type: String, required: true, trim: true },
  status: { type: String, required: true, trim: true },
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('Products', schema, 'Products');
