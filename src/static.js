import { routes } from './util/routes'
import home from './routes/home'
import engagements from './routes/engagements'
import biography from './routes/biography'
import media from './routes/media'

export default routes([
  [ '/', home ],
  [ '/engagements', engagements ],
  [ '/biography', biography ],
  [ '/media', media ],
])
