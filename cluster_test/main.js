const excuteFibo = require('./master')

console.log('---start-----')

let dt = Date.now()
excuteFibo().then((result) => {
  console.log('finish all work using ', Date.now() - dt)
  console.log('Get all result is ', result)
})



dt = Date.now()
excuteFibo().then((result) => {
  console.log('finish all work using ', Date.now() - dt)
  console.log('Get all result is ', result)
})