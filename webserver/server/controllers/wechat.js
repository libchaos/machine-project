import {parse as urlParse} from 'url'
import {parse as queryParse} from 'querystring'
// import {getParamsAsync} from '../wechat-lib/pay'
import config from '../config'
import api from '../api'

export async function signature (ctx, next) {
  let url = ctx.query.url
  if (!url) {
    ctx.throw(404)
  }
  url = decodeURIComponent(url)
  const params = await api.wechat.getSignatureAsync(url)

  ctx.body = {
    success: true,
    data: params
  }
}

export async function redirect (ctx, next) {
  const target = config.SIT_ROOT_URL + '/oauth'
  const scope = 'snsapi_userinfo'
  const {visit, id} = ctx.query
  const params = id ? `${visit}_${id}` : visit
  const url = api.wechat.getAuthorizeURL(scope, target, params)
  ctx.redirect(url)
}

export async function oauth (ctx, next) {
  let url = ctx.query.url
  url = decodeURIComponent(url)
  const urlObj = urlParse(url)
  const params = queryParse(urlObj.query)
  const code = params.code
  const user = await api.wechat.getUserByCode(code)

  ctx.session.user = user
  ctx.body = {
    success: true,
    data: user
  }
}
