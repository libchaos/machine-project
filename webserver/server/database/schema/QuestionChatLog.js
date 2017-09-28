const mongoose = require('mongoose')

const TYPE_TEXT = 'TEXT'

const schema = mongoose.Schema({
  question_root: {type: mongoose.Schema.Types.ObjectId},
  question: { type: mongoose.Schema.Types.ObjectId },
  user: { type: mongoose.Schema.Types.ObjectId },
  doctor: { type: mongoose.Schema.Types.ObjectId },
  type: { type: String, default: TYPE_TEXT },
  from: { type: String },
  content: { type: String },
  images: { type: Array, default: [] },
  created_at: { type: Date, default: Date.now }
}, { collection: 'tmc_inquiry_question_chat_log' })

schema.index({content: 'text'})

mongoose.model('tmc_inquiry_question_chat_log', schema)
