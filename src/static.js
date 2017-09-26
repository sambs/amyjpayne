import { pipe, map, reduce, concat, fromPairs } from 'ramda'
import home from './routes/home'
import engagements from './routes/engagements'
import biography from './routes/biography'

const routes = [
  [ '/', home ],
  [ '/engagements', engagements ],
  [ '/biography', biography ],
]

export default () =>
  pipe(
    map(([ path, fn ]) => fn({ path })),
    reduce(concat, []),
    fromPairs,
  )(routes)
