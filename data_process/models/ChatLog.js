const mongoose = require('mongoose')



const schema = mongoose.Schema({
  root: { type: mongoose.Schema.Types.ObjectId},
  tags: {type: String},
  title: {type: String},
  description: {type: String},
  doctor: {type: String},
  logs: [{
    from: {type: String},
    content: {type: String},
    images: {type: Array},
  }],
  created_at: {type: Date},
  doctor: {type: String},
  user: {type: String},
  rating: {type: Number, default: 0},
  comment: {type: String}
}, { collection: 'ChatLog' });

const Model = mongoose.model('ChatLog', schema);


module.exports = {
  Model,
};
