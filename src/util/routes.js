import { pipe, map, reduce, merge, mergeAll, compose, addIndex, assoc } from 'ramda'
import { join } from 'path'
import render from './render'

const mapIndexed = addIndex(map)

const route = fn => props =>
  ({ [props.path]: compose(render, fn)(props) })

const routes = routes => props =>
  pipe(
    map(([ subPath, fn, extraProps ]) => {
      const path = join(props.path, subPath)
      const subProps = mergeAll([ props, { path }, extraProps ])
      return fn(subProps)
    }),
    reduce(merge, {}),
  )(routes)

const paged = (fn, pages) => props =>
  pipe(
    mapIndexed((items, index) => ({ items, index, number: index + 1 })),
    map(page => assoc('path', `${props.path}/${page.index == 0 ? '' : `${page.number}/` }`, page)),
    pages => map(assoc('pages', pages), pages),
    map(merge(props)),
    map(props => fn(props)),
    reduce(merge, {}),
  )(pages)

export { route, routes, paged }
