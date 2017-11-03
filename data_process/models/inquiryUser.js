/* eslint-disable max-len */
const mongoose = require('mongoose');


const schema = mongoose.Schema({
  nickname: { type: String },
  realname: { type: String },
  mobile: { type: String },
  open_ids: { // 各公众号、小程序的用户openid
    ylfw: { type: String }, // 家庭医生公众号
    syhh: { type: String },
    xcx_syhh: { type: String }, // 十月呵护小程序
  },
  wx_sub: {
    ylfw: { type: Boolean },
  },
  family_doctor: {
    address: { type: String },
    pregnancy_day: { type: Date },
    mobile: { type: String },
    realname: { type: String },
  },
  union_id: { type: String },
  headimageurl: { type: String },
  wx_headimageurl: { type: String },
  gender: { type: Number },
  birthday: { type: Date },
  type: { type: String }, // PRE 备孕    PG 孕期    BABY 产后
  pregnancy_day: { type: Date },
  baby_birthday: { type: Date },
  baby_gender: { type: Number },
  province: { type: String },
  city: { type: String },
  area: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  last_login_at: { type: Date },
  bind_admin: { type: mongoose.Schema.Types.ObjectId },
}, { collection: 'tmc_users' });

const Model = mongoose.model('user', schema);


module.exports = {
  Model,
};
