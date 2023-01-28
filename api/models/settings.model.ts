import { Knex } from 'knex'
import { Application } from '../declarations'
import { User } from './users.model'

export default function (app: Application): Knex {
  const db: Knex = app.get('knexClient')
  const tableName = 'settings'

  db.schema.hasTable(tableName).then(async (exists) => {
    if (!exists) {
      await db.schema.createTable(tableName, (table) => {
        table.increments('id').primary()

        table.string('siteName').notNullable()
        table.string('description')
        table.string('timezone')
        table.string('dateformat')
        table.string('owner').notNullable()
        table.string('email')
        table.json('misc')
        table.dateTime('createdAt')
      })
    }
  })

  return db
}

export interface Setting {
  id?: Number;
  siteName: String | string;
  description?: String | string;
  timezone?: String | string;
  dateformat?: String | string;
  owner?: String | string;
  email?: String | string;
  misc?: String | string | Object;
  createdAt: Date;
  user?: User;
}
