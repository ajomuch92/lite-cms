import { Knex } from 'knex'
import { Application } from '../../declarations'
import { Setting } from '~/api/models'

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
      const { install } = await this.find()
      if (install) {
        const db: Knex = this.app.get('knexClient')
        const result: Array<number> = await db.table('settings').insert(data)
        data.id = result[0]
        return data
      }
      return {}
    } catch {
      return []
    }
  }
}
