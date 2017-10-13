const mongoose = require('mongoose')

const schema = mongoose.Schema({
  department: {type: String},
  category: {type: String},
  tags: {type: Array},
  symptom: {type: String},
  symptom_img: {type: String},
  decription: {type: String},
  kd_body: [{
    kd_title: {type: String},
    content: {type: String},
    images: {type: Array}
  }],
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
}, { collection: 'child_kds' })

schema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

mongoose.model('Childkds', schema)
