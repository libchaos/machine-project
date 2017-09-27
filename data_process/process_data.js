require('./db')
const chatLog = require('./models/inquiryChatLog')
const R = require('ramda')
const csvjson = require('csvjson')
const path = require('path')
const fs = require('fs')


async function getQuestionLogs() {
  const quesLogs = await chatLog.Model.find({}).lean(true)
  const sortByCreateAt = R.sortBy(R.compose(R.prop('created_at')))
  let groupQues = R.groupBy(item => item.question_root)(quesLogs)
  const result = []
  for (const key of Reflect.ownKeys(groupQues)) {
    let content = ''
    sortByCreateAt(groupQues[key]).forEach(item => content += item.content)
    let item = {root: key, content}
    result.push(item)
  }
 return result
  
}

getQuestionLogs()
  .then( result => {
    
    const d = JSON.stringify(result)
    const options = {
      delimiter: ',',
      wrap: false,
      headers: 'key',
    }
    const csvPath = path.resolve(__dirname, './public/data.csv')
    fs.writeFile(csvPath, csvjson.toCSV(d, options), 'utf8', (err) => {
      if (err) throw err
      console.log('It\'s saved!!!');
      process.exit(1)
    })
  })
  .catch(err => console.error)
