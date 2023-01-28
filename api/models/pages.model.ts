import { Knex } from 'knex'
import { Application } from '../declarations'

export default function (app: Application): Knex {
  const db: Knex = app.get('knexClient')
  const tableName = 'pages'

  db.schema.hasTable(tableName).then(async (exists) => {
    if (!exists) {
      await db.schema.createTable(tableName, (table) => {
        table.increments('id').primary()
        table.string('uid')
        table.string('title').notNullable()
        table.string('content').notNullable()
        table.string('status').notNullable()
        table.integer('parentId')
        table.integer('author')
        table.dateTime('createdAt')
        table.dateTime('updatedAt')

        table.foreign('parentId').references('id').inTable('pages')
        table.foreign('author').references('id').inTable('users')
      })
    }
  })

  return db
}

export interface Page {
  id?: Number;
  uid?: String | string;
  title?: String | string;
  content?: String | string;
  status?: String | string;
  parentId?: Number;
  author?: Number;
  createdAt: Date;
  updatedAt?: Date;
}
