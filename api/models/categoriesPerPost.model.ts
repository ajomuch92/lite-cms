import { Knex } from 'knex'
import { Application } from '../declarations'

export default function (app: Application): Knex {
  const db: Knex = app.get('knexClient')
  const tableName = 'categoriesPerPost'

  db.schema.hasTable(tableName).then(async (exists) => {
    if (!exists) {
      await db.schema.createTable(tableName, (table) => {
        table.integer('categoryId')
        table.integer('postId')
        table.primary(['categoryId', 'postId'])

        table.foreign('categoryId').references('id').inTable('categories')
        table.foreign('postId').references('id').inTable('posts')
      })
    }
  })

  return db
}

export interface CategoriesPerPost {
  categoryId: Number;
  postId: Number;
}
