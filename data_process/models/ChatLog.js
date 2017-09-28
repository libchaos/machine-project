const mongoose = require('mongoose')



const schema = mongoose.Schema({
  root: { type: mongoose.Schema.Types.ObjectId},
  logs: [{
    from: {type: String},
    content: {type: String},
    images: {type: Array},
  }],

}, { collection: 'ChatLog' });

const Model = mongoose.model('ChatLog', schema);


module.exports = {
  Model,
};
