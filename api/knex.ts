import { knex } from 'knex'
import { Application } from './declarations'

export default function (app: Application): void {
  const db = knex({ client: 'sqlite3', connection: { filename: './api/database.db' } })

  app.set('knexClient', db)
}
