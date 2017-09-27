import { routes } from './util/routes'
import home from './routes/home'
import engagements from './routes/engagements'
import biography from './routes/biography'

export default routes([
  [ '/', home ],
  [ '/engagements', engagements ],
  [ '/biography', biography ],
])
