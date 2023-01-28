import * as local from '@feathersjs/authentication-local'
import { HookContext } from '@feathersjs/feathers'
import { BadRequest } from '@feathersjs/errors'
import { notFound } from '../../app.hooks'
import { Install } from './install.class'
import { Setting, User } from '~/api/models'
const { hashPassword } = local.hooks

const isValid = async (context: HookContext) => {
  const { app } = context
  const installService: Install = app.service('install')
  const { install } = await installService.find()
  if (!install) {
    throw new BadRequest('No install needed')
  }
  return context
}

const validation = (context: HookContext) => {
  const data = context.data as Setting
  if (!data.siteName) {
    throw new BadRequest('Site name is required')
  }
  if (!data.owner) {
    throw new BadRequest('Owner field is required')
  }
  if (!data.user) {
    throw new BadRequest('User field is required')
  }
  if (!data.user.username) {
    throw new BadRequest('Username field is required')
  }
  if (!data.user.password) {
    throw new BadRequest('Password field is required')
  }
  return context
}

const roleAssignment = (context: HookContext) => {
  const data = context.data as Setting
  if (data.user) {
    const user: User = data.user
    user.roleId = 1
    user.name = `${data.owner}`
    user.createdAt = new Date()
  }
  return context
}

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [isValid, validation, hashPassword('user.password'), roleAssignment],
    update: [notFound],
    patch: [notFound],
    remove: [notFound]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
