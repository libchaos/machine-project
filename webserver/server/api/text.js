import rpc from '../rpc_client'
import mongoose from 'mongoose'
import nodejieba from 'nodejieba'
import R from 'ramda'

const QuesLog = mongoose.model('tmc_inquiry_question_chat_log')
const Log = mongoose.model('ChatLog')

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
