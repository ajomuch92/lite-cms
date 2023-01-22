import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'

import feathers, { HookContext as FeathersHookContext } from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import express from '@feathersjs/express'

import { Application } from './declarations'
// import logger from './logger'
import middleware from './middleware'
import services from './services'
// import appHooks from './app.hooks'

import authentication from './authentication'
import knex from './knex'

const app: Application = express(feathers())
export type HookContext<T = any> = { app: Application } & FeathersHookContext<T>

app.configure(configuration())
app.use(helmet({
  contentSecurityPolicy: false
}))
app.use(cors())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.configure(express.rest())

app.configure(knex)

app.use(middleware)

app.configure(authentication)
app.configure(services)
// app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(express.notFound())
// app.use(express.errorHandler({ logger } as any))

// app.hooks(appHooks)

export default app
