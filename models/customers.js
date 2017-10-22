var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  address: {
    street: { type: String, trim: true },
    zipcode: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: {
      _id: { type: String, required: true },
      code: { type: String, required: true },
      name: { type: String, required: true },
      status: { type: String, required: true, trim: true }
    }
  },
  status: { type: String, required: true, trim: true },
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('Customers', schema, 'Customers');
