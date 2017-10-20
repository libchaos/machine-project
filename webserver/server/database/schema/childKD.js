const mongoose = require('mongoose')
const mongoosastic = require('mongoosastic')
const body = mongoose.Schema({
  kd_title: {type: String},
  content: {type: String},
  images: {type: Array, es_type: 'string'}
})
const schema = mongoose.Schema({
  department: {type: String},
  category: {type: String},
  tags: {type: Array, es_type: 'string'},
  symptom: {type: String, es_boost: 2.0},
  symptom_img: {type: String},
  decription: {type: String},
  kd_body: {type: [body], es_type: 'nested'},
  meta: {
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
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
  hosts: ['localhost:9200'],
  hydrate: true,
  hydrateWithESResults: true,
  hydrateOptions: {select: 'symptom'}
})

const ChildKD = mongoose.model('childKD', schema)

ChildKD.createMapping({
  'analyzer': {
    'content': {
      'type': 'text',
      'analyzer': 'ik_smart',
      'search_analyzer': 'ik_max_word'
    }
  }
}, function (err, mapping) {
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
