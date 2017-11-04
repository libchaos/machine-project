require('./db')
const chatLog = require('./models/ChatLog')
const R = require('ramda')
const csvjson = require('csvjson')
const path = require('path')
const fs = require('fs')


async function groupUser() {
  let chatLogs = await chatLog.Model.find({}).lean(true)
  chatLogs  = R.filter(item => item && item.user && item.doctor, chatLogs)
  console.log(chatLogs[0])
  const groupByUser = R.groupBy(item => item.user)
  
  const groupUser = groupByUser(chatLogs)
  console.log(Object.keys(groupUser))
  const result = []
  count = 0
  for (const user of Reflect.ownKeys(groupUser)) {
    if (user === 'UNKOWN') {
      continue
    }
    const item = {}
    item.user = user
    item.doctors = groupUser[user].map(i => i.doctor || '').join(',')
    console.log('count ', ++count)
    result.push(item)
  }
  return result
}

groupUser()
  .then(result => {
    const d = JSON.stringify(result)
    const options = {
      delimiter: ',',
      wrap: false,
      headers: 'key',
    }
    const csvPath = path.resolve(__dirname, './public/user.csv')
    fs.writeFile(csvPath, csvjson.toCSV(d, options), 'utf8', (err) => {
      if (err) throw err
      console.log('It\'s saved!!!');
      process.exit(1)
    })
  })
  .catch(err => console.error)



