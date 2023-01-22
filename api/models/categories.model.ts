import { Knex } from 'knex'
import { Application } from '../declarations'

export default function (app: Application): Knex {
  const db: Knex = app.get('knexClient')
  const tableName = 'categories'

  db.schema.hasTable(tableName).then(async (exists) => {
    if (!exists) {
      await db.schema.createTable(tableName, (table) => {
        table.increments('id').primary()

        table.string('name').unique().notNullable()
      })
    }
  })

  return db
}

export interface Category {
  id: Number;
  name: String | string;
}
