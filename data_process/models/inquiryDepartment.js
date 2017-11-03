const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: { type: String },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  sort: { type: Number, default: 0 },
  del: { type: Boolean, default: false },
}, { collection: 'tmc_inquiry_department' });

const Model = mongoose.model('tmc_inquiry_department', schema);

module.exports = { Model };