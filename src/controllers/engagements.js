import {
  ap, append, addIndex, partition, compose, flip, splitEvery, map, evolve, reverse,
  sortBy, prop, over, lensIndex, merge,
} from 'ramda'

import engagements from '../../data/engagements.json'
import * as views from '../views'

const mapIndexed = addIndex(map)

const now = new Date()

const [ past, upcoming ] = compose(
  over(lensIndex(0), reverse),
  partition(e => e.date < now),
  sortBy(prop('date')),
  map(evolve({ date: d => new Date(d) })),
)(engagements)

const paged = (path, view, context, items) =>
  compose(
    map(([ items, index, path, pages ]) =>
      ([ path, view, merge(context, { items, index, pages }) ])
    ),
    ap(
      routes => pages => map(append(pages), routes),
      map(([ items, index, path ]) => ({ index, path, number: index + 1 }))
    ),
    map(
      ap(
        flip(append),
        ([ items, index ]) => index == 0 ? path : `${path}${index + 1}`
      )
    ),
    mapIndexed((items, index) => ([ items, index ])),
    splitEvery(3)
  )(items)

export default path => ([
  [ path + '/', views.engagements, { items: upcoming, upcoming: true } ],
  ...paged(path + '/past/', views.engagements, { upcoming: false }, past)
])
