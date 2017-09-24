import { pipeP, map, mapObjIndexed, keys, prop, path, pluck, groupBy } from 'ramda'
import { createClient } from 'contentful'
import write from './util/write'
//import { tap } from 'ramda'
//import print from './util/print'

import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } from '../config'

const contentful = createClient({
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  space: CONTENTFUL_SPACE_ID,
})

const getEntries = pipeP(
  () => contentful.getEntries(),
  //tap(print),
  prop('items'),
  groupBy(path([ 'sys', 'contentType', 'sys', 'id' ])),
  map(pluck('fields')),
  mapObjIndexed((data, type) =>
    write(`data/${type}.json`, JSON.stringify(data, null, 2))
  ),
  keys,
  Promise.all.bind(Promise)
)

const getAssets = pipeP(
  () => contentful.getAssets(),
  //tap(print),
  prop('items'),
  pluck('fields'),
  x => JSON.stringify(x, null, 2),
  write('data/assets.json')
)

export default () => Promise.all([ getEntries(), getAssets() ])
