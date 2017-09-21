import jayson from 'jayson'

const client = jayson.client.http({
  port: 4000,
  hostname: 'localhost'
})

function request (method, args) {
  return new Promise((resolve, reject) => {
    client.request(method, args, function (err, error, data) {
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

export default request
