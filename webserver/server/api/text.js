import rpc from '../rpc_client'
import mongoose from 'mongoose'
import nodejieba from 'nodejieba'
import R from 'ramda'
import util from 'util'

const QuesLog = mongoose.model('tmc_inquiry_question_chat_log')
const Log = mongoose.model('ChatLog')
const ChildKD = mongoose.model('childKD')
const Doctor = mongoose.model('tmc_inquiry_employee_doctor')
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

export async function getHotWords (start, end) {
  let query = {}
  if (!start || !end) {
    query = {

    }
  } else {
    query = {
      created_at: {
        $gte: start,
        $lte: end
      }
    }
  }
  let result = await Log.find(query).exec()
  console.log(result)
  result = R.groupBy(item => item.tags)(result)
  return result
}

export async function getRecommend (sentence) {
  let names = R.filter(item => ['nr', 'x'].indexOf(item.tag) > -1, nodejieba.tag(sentence))
  names = R.map(R.prop('word'), names)
  const items = await rpc('get_phrases', [sentence])
  let doctors = await Log.aggregate({$group: {_id: '$doctor'}}).exec()
  doctors = R.map(R.prop('_id'), doctors)
  let result = []

  for (const name of names) {
    if (!name) {
      continue
    }
    if (doctors.indexOf(name) > -1) {
      let temp = await rpc('predict_user', [name])
      temp = R.filter(name => doctors.indexOf(name) > -1, temp)
      if (!temp) {
        continue
      } else {
        result = result.concat(temp)
      }
    }
  }

  for (const item of items) {
    if (!item) {
      continue
    }

    let tempD = await rpc('predict_ques', [item])

    if (!tempD) {
      continue
    } else {
      result = result.concat(tempD)
    }
  }
  let setDoctor = Array.from(new Set(result))
  if (setDoctor.length >= 8) {
    setDoctor = R.slice(0, 9, setDoctor)
  }
  return setDoctor
}

export async function getDoctor (name) {
  const doctor = await Doctor.findOne({name: name}).exec()
  if (!doctor) {
    return ''
  } else {
    return doctor
  }
}
