import { Application } from '../declarations'
import categoriesService from './categories/categories.service'
import categoriesPerPostService from './categoriesPerPost/categoriesPerPost.service'
import imagesService from './images/images.service'
import installService from './install/install.service'
import pagesService from './pages/pages.service'
import postsService from './posts/posts.service'
import rolesService from './roles/roles.service'
import settingsService from './settings/settings.service'
import usersService from './users/users.service'

export default function (app: Application): void {
  app.configure(rolesService)
  app.configure(categoriesService)
  app.configure(settingsService)
  app.configure(imagesService)
  app.configure(usersService)
  app.configure(pagesService)
  app.configure(postsService)
  app.configure(categoriesPerPostService)
  app.configure(installService)
}
