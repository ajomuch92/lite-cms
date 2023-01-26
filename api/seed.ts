import { Knex } from 'knex'
import { Application } from './declarations'

export async function seedRoles (app: Application): Promise<void> {
  const db: Knex = app.get('knexClient')
  const service = app.service('roles')
  const result: any = await service.find()
  if (result?.total === 0) {
    await db.table('roles').insert([
      { name: 'Admin' },
      { name: 'Writer' }
    ])
  }
}
