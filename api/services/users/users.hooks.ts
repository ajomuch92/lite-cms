import * as local from '@feathersjs/authentication-local'
import { createdAt, uuidHook } from '../../app.hooks'
const { hashPassword, protect } = local.hooks

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hashPassword('password'), createdAt, uuidHook],
    update: [hashPassword('password')],
    patch: [hashPassword('password')],
    remove: []
  },

  after: {
    all: [
      protect('password')
    ],
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
