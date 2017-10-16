const mongoose = require('mongoose')
const mongoosastic = require('mongoosastic')
const schema = mongoose.Schema({
  department: {type: String},
  category: {type: String},
  tags: {type: Array},
  symptom: {type: String, es_indexed: true},
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
}, { collection: 'childKD' })

schema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

schema.plugin(mongoosastic, {
  hosts: ['localhost:9200']
})

const ChildKD = mongoose.model('childKD', schema)

ChildKD.createMapping(function (err, mapping) {
  if (err) {
    console.log('error creating mapping (you can safely ignore this)')
    console.log(err)
  } else {
    console.log('mapping created!')
    console.log(mapping)
  }
})

const stream = ChildKD.synchronize()
let count = 0

stream.on('data', (err, doc) => {
  if (err) console.log(err)
  count++
})

stream.on('close', function () {
  console.log('indexed ' + count + ' documents!')
})
stream.on('error', function (err) {
  console.log(err)
})
