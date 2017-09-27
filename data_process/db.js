const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = mongoose.connect("mongodb://localhost/turing", {
    server: {
      reconnectTries: Number.MAX_VALUE,
      socketOptions: { keepAlive: 1 },
    },
    db: { native_parser: true },
    replset: {
      auto_reconnect: true,
      socketOptions: { keepAlive: 1, connectTimeoutMS: 5000 },
    },
})

db.connection.on('error', (error) => console.log(`数据库连接失败 ${error}`))
db.connection.on('open', () => console.log(`数据库连接成功`))