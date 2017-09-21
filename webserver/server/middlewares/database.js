import fs from 'fs'
import { resolve } from 'path'
import mongoose from 'mongoose'
import config from '../config'
import R from 'ramda'

const models = resolve(__dirname, '../database/schema')

fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*js$/))
  .forEach(file => require(resolve(models, file)))

export const database = app => {
  mongoose.set('debug', true)

  mongoose.connect(config.db)

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.db)
  })
  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.on('open', async () => {
    console.log('Connected to MongoDB ', config.db)

    const User = mongoose.model('User')

    let user = await User.findOne({
      email: 'sb@123.com'
    }).exec()

    if (!user) {
      console.log('写入管理员数据')
      user = new User({
        email: 'sb@123.com',
        password: 'sb123',
        role: 'admin'
      })

      await user.save()
    }
  })
}
