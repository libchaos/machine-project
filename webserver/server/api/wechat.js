import mongoose from 'mongoose'
import {getWechat, getOauth} from '../wechat'

const User = mongoose.model('User')

const client = getWechat()

export async function getSignatureAsync (url) {
  const data = await client.fetchAccessToken()
  const token = data.access_token
  const ticketData = await client.fetchTicket(token)
  const ticket = ticketData.ticket

  let params = client.sign(ticket, url)
  params.appId = client.appID
  return params
}

export function getAuthorizeURL (...args) {
  const oauth = getOauth()
  console.log(oauth)
  return oauth.getAuthorizeURL(...args)
}

export async function getUserByCode (code) {
  const oauth = getOauth()
  const data = await oauth.fetchAccessToken(code)
  const user = await oauth.getUserInfo(data.access_token)

  const existUser = await User.findOne({
    unionid: data.unionid
  }).exec()
  if (!existUser) {
    let newUser = new User({
      openid: [data.openid],
      unionid: data.unionid,
      nickname: user.nickname,
      province: user.province,
      country: user.country,
      city: user.city,
      headimgurl: user.headimgurl,
      sex: user.sex
    })
    await newUser.save()
  }

  return {
    nickname: user.nickname,
    province: user.province,
    country: user.country,
    unionid: user.unionid,
    headimgurl: user.headimgurl,
    sex: user.sex
  }
}
