import { pipe, map, reduce, merge, compose } from 'ramda'
import { join } from 'path'
import render from './render'

const route = fn => props => 
  ({ [props.path]: compose(render, fn)(props) })

const routes = routes => props => 
  pipe(
    map(([ subPath, fn ]) => {
      const path = join(props.path, subPath)
      const subProps = merge(props, { path })
      return fn(subProps)
    }),
    reduce(merge, {}),
  )(routes)

export { route, routes }
