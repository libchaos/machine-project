// const rq = require('request-promise')
// url = "http://localhost:4000/jsonrpc"
// const form = {
//   "method": "foobar",
//   "params": {'foo': "a", 'bar': "b"},
//   "jsonrpc": "2.0",
//   "id": 0,
// }
// rq.post(url, form)
//   .then(data => console.log(data))


const jayson = require('jayson')

const client = jayson.client.http({
  port:4000,
  hostname: 'localhost'
})

function request(method, args) {
  return new Promise((resolve, reject) => {
    client.request(method, args, function(err, error, data){
      if (err) {
        reject(err)
      }
      if (error) {
        reject(error)
      }
      resolve(data)
    })
  })  
}


request('add', [1, 2])
  .then(data => {
    console.log(data);
  })