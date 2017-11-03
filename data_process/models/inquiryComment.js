const mongoose = require('mongoose');

const User = require('./inquiryUser').Model;
const InquiryDoctor = require('./InquiryDoctor').Model;


const TYPE_VIRTUAL = 'VIRTUAL';
const TYPE_REAL = 'REAL';
const STATUS_OFFLINE = 'OFFLINE';
const STATUS_ONLINE = 'ONLINE';

const schema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: User.modelName },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'tmc_inquiry_questions' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: InquiryDoctor.modelName },
  department: { type: mongoose.Schema.Types.ObjectId },
  virtual_user: {
    nickname: { type: String },
    headimageurl: { type: String },
  },
  status: { type: String, default: STATUS_OFFLINE },
  type: { type: String, default: TYPE_REAL }, // VIRTUAL虚拟评论   REAL真实评论
  content: { type: String },
  grade: { type: Number },
  sort: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
}, { collection: 'tmc_inquiry_comments' });

const Model = mongoose.model('tmc_inquiry_comments', schema);

module.exports = {
  Model,
  TYPE_VIRTUAL,
  TYPE_REAL,
  STATUS_OFFLINE,
  STATUS_ONLINE,
};
