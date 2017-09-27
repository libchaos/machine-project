import api from '../api'
import rpc from '../rpc_client'
import {controller, get, post, required} from '../decorator/route'

@controller('/admin')
export class adminController {
  @post('login')
  @required({body: ['email', 'password']})
  async login (ctx, next) {
    const {email, password} = ctx.request.body
    const data = await api.admin.login(email, password)
    console.log(data)
    const {user, match} = data
    if (match) {
      if (user.role !== 'admin') {
        return (ctx.body = {
          success: false,
          err: 'coming wrong place'
        })
      }

      ctx.session.user = {
        _id: user._id,
        email: user.email,
        role: user.role,
        nickname: user.nickname,
        avatarUrl: user.avatarUrl
      }
      const rpcData = await rpc('add', [1, 2])
      return (ctx.body = {
        success: true,
        user: {
          email: user.email,
          nickname: user.nickname,
          avatarUrl: user.avatarUrl
        },
        rpcData
      })
    }
    return (ctx.body = {
      success: false,
      err: 'password was wrong'
    })
  }

  @post('logout')
  async logout (ctx, next) {
    ctx.session = null
    ctx.body = {
      success: true
    }
  }

  @get('payments')
  async getPayments (ctx, next) {
    const data = await api.payment.fetchPayments()
    ctx.body = {
      sucess: true,
      data
    }
  }
}