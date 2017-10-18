import rpc from '../rpc_client'
import mongoose from 'mongoose'
import nodejieba from 'nodejieba'
import R from 'ramda'
import util from 'util'

const QuesLog = mongoose.model('tmc_inquiry_question_chat_log')
const Log = mongoose.model('ChatLog')
const ChildKD = mongoose.model('childKD')
ChildKD.search = util.promisify(ChildKD.search).bind(ChildKD)

async function processQues (quesLogs) {
  let groupQues = R.groupBy(item => item.question_root)(quesLogs)
  console.log(groupQues)
  const result = []
  for (const key of Reflect.ownKeys(groupQues)) {
    let log = await Log.findOne({root: key}).exec()
    result.push(log)
  }
  return result
}

export async function words (sentence) {
  const segs = nodejieba.cut(sentence)
  console.log(segs)
  const result = []
  for (const item of segs) {
    let wordList = await rpc('predict_simular', [item])
    result.push(wordList)
  }
  return result
}

export async function questions (term) {
  const quesLogs = await QuesLog.find({$text: {$search: term}}).exec()
  const result = processQues(quesLogs)
  return result
}

export async function question (id) {
  const quesLogs = await QuesLog.find({question_root: id}).exec()
  const result = processQues(quesLogs)
  return result
}

export async function childKD (sentence) {
  const terms = nodejieba.cut(sentence)
  console.log(terms)
  let result
  result = await ChildKD.search({
    query_string: {
      query: sentence
    }
  })

  return result.hits.hits
}

export async function childKDOne (id) {
  const result = await ChildKD.findOne({_id: id}).exec()
  return result
}
