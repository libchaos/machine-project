const mongoose = require('mongoose');


const schema = mongoose.Schema({
  name: { type: String },
  title: { type: String },
  image: { type: String },
  hospital: { type: String },
  tags: { type: Array },
  description: { type: String },
  department: { type: mongoose.Schema.Types.ObjectId },
  method: { type: String },
  bind_employee: { type: mongoose.Schema.Types.ObjectId },
  bind_doctor: { type: mongoose.Schema.Types.ObjectId },
  text_inquiry_enable: { type: Boolean, default: false },
  text_inquiry_price: { type: Number, default: 0 },
  text_inquiry_limit: { type: Number, default: 0 },
  text_inquiry_today_count: { type: Number, default: 0 },
  online: { type: Boolean, default: false },
  sort: { type: Number, default: 0 },
  del: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
}, { collection: 'tmc_inquiry_employee_doctor' });


// const Model = mongoose.model('tmc_inquiry_employee_doctor', schema);

let Model
try {
  Model = mongoose.model('tmc_inquiry_employee_doctor')
} catch (error) {
  Model = mongoose.model('tmc_inquiry_employee_doctor', schema)
}


module.exports = {
  Model
}
