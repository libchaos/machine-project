const fs = require('fs')
const Redis = require('ioredis')

const {Config, Task, run} = require('mongo-es')

const redis = new Redis('localhost')

Task.onSaveCheckpoint((name, checkpoint) => {
  return redis.set(`mongo-es:${name}`, JSON.stringify(checkpoint))
})

Task.onLoadCheckpoint((name) => {
  return redis.get(`mongo-es:${name}`).then(JSON.parse).catch(console.error)
})

run(new Config(fs.readFileSync('config.json', 'utf8')))