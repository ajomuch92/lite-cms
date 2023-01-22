import { Service, KnexServiceOptions } from 'feathers-knex'
import { Application } from '../../declarations'

export class Images extends Service {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor (options: Partial<KnexServiceOptions>, app: Application) {
    super({
      ...options,
      name: 'images'
    })
  }
}
