export { Category } from './categories.model'
export { CategoriesPerPost } from './categoriesPerPost.model'
export { Image } from './images.model'
export { Page } from './pages.model'
export { Post } from './posts.model'
export { Role } from './roles.model'
export { Setting } from './settings.model'
export { User } from './users.model'

export interface response {
  total?: number
  limit?: number
  skip?: number
  data?: Array<any | object>
}
