import koaBody from 'koa-bodyparser'
// import jwt from 'koa-jwt'
// import config from '../config'

import session from 'koa-session'

export const addBody = app => {
  app.use(koaBody())
}

// export const addJWT = app => {
//   const jwtConfig = {secret: config.jwt_sercret}
//   app.use(jwt(jwtConfig).unless({path: [/^\/admin\/login/, /^\/admin\/register/]}))
// }

export const addSession = app => {
  app.keys = ['multi']

  const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    signed: true,
    rolling: false
  }
  app.use(session(CONFIG, app))
}
