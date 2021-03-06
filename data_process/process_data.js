require('./db')
const chatLog = require('./models/inquiryChatLog')
const commentLog = require('./models/inquiryComment')
const newChatLog = require('./models/ChatLog')
const R = require('ramda')
const csvjson = require('csvjson')
const path = require('path')
const fs = require('fs')


async function getQuestionLogs() {

  const quesLogs = await chatLog.Model.find({}).populate(['doctor', 'user']).lean(true)
  const sortByCreateAt = R.sortBy(R.compose(R.prop('created_at')))
  let groupQues = R.groupBy(item => item.question_root)(quesLogs)
  const result = []
  for (const key of Reflect.ownKeys(groupQues)) {
    let content = ''
    let logs = []
    const doctor = groupQues[key][0].doctor.name || ''
    const user = groupQues[key][0].user.nickname || ''
    
    const title = groupQues[key][0].doctor.title || ''
    const tags = groupQues[key][0].doctor.tags.join(' ').trim() || ''
    const description = groupQues[key][0].doctor.description.trim() || ''
    const created_at = groupQues[key][0].created_at
    const commentDoc = await commentLog.Model.findOne({question: key}).lean(true) || {}
    const comment = commentDoc.content || ''
    const rating = commentDoc.grade || 0
    
    sortByCreateAt(groupQues[key]).forEach(item => {
      content += item.content
      logs.push({from: item.from, images: item.images, content: item.content})
    })
    let item = {root: key, content, title, tags, description, user, doctor, comment, rating}
    let log = {root: key, logs}

    await newChatLog.Model.findOneAndUpdate({
      root: log.root
    }, {
      root: log.root,
      doctor,
      user,
      comment,
      rating,
      title,
      tags,
      description,
      logs: log.logs,
      created_at
    }, {
      upsert: true,
      new: true,
      setDefaultOnInsert: true
    })
    console.log('done1')
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
