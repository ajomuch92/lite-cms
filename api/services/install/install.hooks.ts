import { notFound } from '../../app.hooks'

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
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
