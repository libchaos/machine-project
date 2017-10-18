import api from '../api'
import {controller, get} from '../decorator/route'

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
}
