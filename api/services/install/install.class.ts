import { Knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'
import { Application } from '../../declarations'
import { Page, Setting } from '~/api/models'

export class Install {
  private app: Application

  constructor (app: Application) {
    this.app = app
  }

  async find () {
    try {
      const db: Knex = this.app.get('knexClient')
      const count: Array<any> | object = await db.table('settings').count('*')
      if (Array.isArray(count) && count.length > 0) {
        return { install: count[0]['count(*)'] === 0 }
      }
      return { install: false }
    } catch {
      return { install: false }
    }
  }

  async create (data: Setting, _: any) {
    try {
      const db: Knex = this.app.get('knexClient')
      const { user } = data
      delete data.user
      const result: Array<number> = await db.table('settings').insert(data)
      await db.table('users').insert(user || {})
      data.id = result[0]
      const firstPage: Page = {
        author: data.id,
        title: 'Hello World',
        content: '<h1>Hello World</h1>',
        createdAt: new Date(),
        uid: uuidv4(),
        status: 'published'
      }
      await db.table('pages').insert(firstPage)
      return data
    } catch (err) {
      return []
    }
  }
}
