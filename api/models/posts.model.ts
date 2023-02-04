import { Knex } from 'knex'
import { Application } from '../declarations'

export default function (app: Application): Knex {
  const db: Knex = app.get('knexClient')
  const tableName = 'posts'

  db.schema.hasTable(tableName).then(async (exists) => {
    if (!exists) {
      await db.schema.createTable(tableName, (table) => {
        table.increments('id').primary()
        table.string('uid')
        table.string('title').notNullable()
        table.string('content').notNullable()
        table.integer('author').notNullable()
        table.string('status').notNullable()
        table.integer('views')
        table.dateTime('createdAt')
        table.dateTime('updatedAt')

        table.foreign('author').references('id').inTable('users')
      })
    }
  })

  return db
}

export interface Post {
  id: Number;
  uid: String | string;
  title: String | string;
  content: String | string;
  author: Number;
  status: String | string;
  createdAt: Date;
  updatedAt: Date;
}
