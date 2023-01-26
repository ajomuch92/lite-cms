import { Knex } from 'knex'
import { Application } from '../declarations'
import { seedRoles } from '../seed'

export default function (app: Application): Knex {
  const db: Knex = app.get('knexClient')
  const tableName = 'roles'

  db.schema.hasTable(tableName).then(async (exists) => {
    if (!exists) {
      await db.schema.createTable(tableName, (table) => {
        table.increments('id').primary()

        table.string('name').unique().notNullable()
      })
      seedRoles(app)
    }
  })

  return db
}

export interface Role {
  id: Number;
  name: String | string;
}
