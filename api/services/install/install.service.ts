import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Install } from './install.class'
import hooks from './install.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'install': Install & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  // Initialize our service with any options it requires
  app.use('/install', new Install(app))

  // Get our initialized service so that we can register hooks
  const service = app.service('install')

  service.hooks(hooks)
}
