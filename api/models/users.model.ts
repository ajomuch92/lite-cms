import { Knex } from 'knex'
import { Application } from '../declarations'

export default function (app: Application): Knex {
  const db: Knex = app.get('knexClient')
  const tableName = 'users'

  db.schema.hasTable(tableName).then(async (exists) => {
    if (!exists) {
      await db.schema.createTable(tableName, (table) => {
        table.increments('id').primary()

        table.string('username').unique().notNullable()
        table.string('password').notNullable()
        table.string('uid')
        table.integer('roleId').notNullable()
        table.dateTime('createdAt')
        table.binary('profile')
        table.foreign('roleId').references('id').inTable('roles')
      })
    }
  })

  return db
}

export interface User {
  id: Number;
  username: String | string;
  password: String | string;
  uid: String | string;
  roleId: Number;
  createdAt: Date;
  profile?: String | string;
}
