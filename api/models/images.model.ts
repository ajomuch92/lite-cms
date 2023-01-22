import { Knex } from 'knex'
import { Application } from '../declarations'

export default function (app: Application): Knex {
  const db: Knex = app.get('knexClient')
  const tableName = 'images'

  db.schema.hasTable(tableName).then(async (exists) => {
    if (!exists) {
      await db.schema.createTable(tableName, (table) => {
        table.increments('id').primary()

        table.string('name')
        table.binary('file')
        table.string('uid')
        table.dateTime('createdAt')
      })
    }
  })

  return db
}

export interface Image {
  id: Number;
  name: String | string;
  file: String | string;
  uid: String | string;
  createdAt: Date;
}
