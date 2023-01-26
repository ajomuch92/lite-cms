import { HookContext } from '@feathersjs/feathers'
import { NotFound } from '@feathersjs/errors'

const createdAt = (context: HookContext) => {
  context.data.createdAt = new Date()
  return context
}

const updatedAt = (context: HookContext) => {
  context.data.updatedAt = new Date()
  return context
}

const notFound = (_: HookContext) => {
  throw new NotFound('Path not found')
}

const authorHook = async (context: HookContext) => {
  const { app, result } = context
  if (result?.author) {
    const service = app.service('users')
    if (service) {
      const authorResult: any = await service.get(result.author)
      context.result = {
        ...context.result,
        user: authorResult?.data || {}
      }
    }
  }
  return context
}

export {
  createdAt,
  updatedAt,
  notFound,
  authorHook
}
