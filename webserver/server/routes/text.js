import api from '../api'
import {controller, get, post} from '../decorator/route'

@controller('')
export class textController {
  @get('questions')
  async getQuestions (ctx, next) {
    const term = ctx.query.term
    if (!term) {
      return (ctx.body = {
        success: false,
        data: []
      })
    }
    const data = await api.text.questions(term)
    ctx.body = {
      success: true,
      data
    }
  }

  @get('words')
  async getWords (ctx, next) {
    const sentence = ctx.query.sentence
    const data = await api.text.words(sentence)
    ctx.body = {
      success: true,
      data
    }
  }

  @get('question')
  async getQuestion (ctx, next) {
    const id = ctx.query.id
    if (!id) {
      return (ctx.body = {
        sucess: false,
        data: []
      })
    }
    const data = await api.text.question(id)
    ctx.body = {
      success: true,
      data
    }
  }

  @get('child_kds')
  async getKD (ctx, next) {
    const sentence = ctx.query.sentence
    const data = await api.text.childKD(sentence)
    ctx.body = {
      success: true,
      data
    }
  }
  @get('child_kd')
  async getKDOne (ctx, next) {
    const id = ctx.query.id
    const data = await api.text.childKDOne(id)
    ctx.body = {
      success: true,
      data
    }
  }
  @get('hotwords')
  async getHotWords (ctx, next) {
    let {start, end} = ctx.query
    start = new Date(start) || ''
    end = new Date(end) || ''
    const data = await api.text.getHotWords(start, end)
    ctx.body = {
      success: true,
      data
    }
  }

  @post('recommend')
  async getRecmemend (ctx, next) {
    const sentence = ctx.request.body.sentence
    const data = await api.text.getRecommend(sentence)
    ctx.body = {
      success: true,
      data
    }
  }

  @get('doctor')
  async getDoctor (ctx, next) {
    const doctor = ctx.query.name
    const data = await api.text.getDoctor(doctor)
    ctx.body = {
      success: true,
      data
    }
  }
}
