const mongoose = require('mongoose')
const InquiryDoctor = require('./inquiryDoctor').Model
const TYPE_TEXT = 'TEXT'

const FROM_DOCTOR = 'DOCTOR'
const FROM_USER = 'USER'

const schema = mongoose.Schema({
  question_root: { type: mongoose.Schema.Types.ObjectId},
  question: { type: mongoose.Schema.Types.ObjectId },
  user: { type: mongoose.Schema.Types.ObjectId },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: InquiryDoctor.modelName },
  type: { type: String, default: TYPE_TEXT },
  from: { type: String },
  content: { type: String },
  images: { type: Array, default: [] },
  created_at: { type: Date, default: Date.now },
}, { collection: 'tmc_inquiry_question_chat_log' });

const Model = mongoose.model('tmc_inquiry_question_chat_log', schema);


module.exports = {
  Model,
  FROM_DOCTOR,
  FROM_USER,
  TYPE_TEXT,
};
