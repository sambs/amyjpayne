import { pipeP, map, mapObjIndexed, merge, keys, prop, path, pluck, groupBy } from 'ramda'
import { createClient } from 'contentful'
import write from './util/write'
//import print from './util/print'

import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } from '../config'

const contentful = createClient({
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  space: CONTENTFUL_SPACE_ID,
})

const getEntries = pipeP(
  () => contentful.getEntries(),
  //print,
  prop('items'),
  groupBy(path([ 'sys', 'contentType', 'sys', 'id' ])),
  map(map(({ sys: { id }, fields }) => merge(fields, { id }))),
  mapObjIndexed((data, type) =>
    write(`data/${type}.json`, JSON.stringify(data, null, 2))
  ),
  keys,
  Promise.all.bind(Promise)
)

const getAssets = pipeP(
  () => contentful.getAssets(),
  //print,
  prop('items'),
  pluck('fields'),
  x => JSON.stringify(x, null, 2),
  write('data/assets.json')
)

export default () => Promise.all([ getEntries(), getAssets() ])
