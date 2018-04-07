import {
  tap, pipeP, pipe, head, map, mapObjIndexed, merge, evolve, keys, prop,
  groupBy, ifElse, append, when, eqProps, always, over, lensProp,
} from 'ramda'

import { createClient } from 'contentful'
import { read, write } from './util/data'
import wait from './util/wait'
import tapP from './util/tap-p'
import print from './util/print'

import { LOCALE, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } from '../config'

const SYNC_PERIOD = 1500

const contentful = createClient({
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  space: CONTENTFUL_SPACE_ID,
})

const formatEntry = pipe(
  over(
    lensProp('fields'),
    map(
      pipe(
        prop(LOCALE),
        when(Array.isArray, map(entry => formatEntry(entry)))
      )
    )
  ),
  ({
    sys: { id, createdAt, updatedAt, contentType },
    fields,
  }) => merge(fields, { id, createdAt, updatedAt, contentType: contentType && contentType.sys.id }),
)

const writeEntries = pipe(
  map(formatEntry),
  groupBy(prop('contentType')),
  mapObjIndexed((data, type) =>
    write(`${type}.json`, data)
  ),
  keys,
  Promise.all.bind(Promise)
)

const addOrUpdateEntry = pipe(
  formatEntry,
  entry => read(`${entry.contentType}.json`).then(pipe(
    ifElse(
      () => entry.createdAt == entry.updatedAt,
      pipe(
        tap(() => console.log('Adding entry')),
        append(entry),
      ),
      pipe(
        tap(() => console.log('Updating entry')),
        map(when(eqProps('id', entry), always(entry))),
      ),
    ),
    write(`${entry.contentType}.json`),
  )),
)

const formatAsset = ({ sys: { id, createdAt, updatedAt }, fields }) =>
  merge(map(prop(LOCALE), fields), { id, createdAt, updatedAt })

const writeAssets = pipe(map(formatAsset), write('assets.json'))

const addOrUpdateAsset = pipe(
  formatAsset,
  asset => read('assets.json').then(pipe(
    ifElse(
      () => asset.createdAt == asset.updatedAt,
      pipe(
        tap(() => console.log('Adding asset')),
        append(asset),
      ),
      pipe(
        tap(() => console.log('Updating asset')),
        map(when(eqProps('id', asset), always(asset))),
      ),
    ),
    write('assets.json'),
  )),
)

const initialSync = pipeP(
  () => contentful.sync({ initial: true, locale: 'en-GB' }),
  ({ nextSyncToken, entries, assets }) => Promise.all([
    nextSyncToken, 
    writeEntries(entries),
    writeAssets(assets),
    write('rawEntries.json', entries),
    write('rawAssets.json', assets),
  ]),
  head
)

const nextSync = pipeP(
  nextSyncToken => contentful.sync({ nextSyncToken }),
  tap(() => print('Got next')),
  tapP(({ entries, assets }) =>
    Promise.all([
      ...map(addOrUpdateEntry, entries),
      ...map(addOrUpdateAsset, assets),
    ])
  ),
  prop('nextSyncToken'),
  wait(SYNC_PERIOD),
  token => nextSync(token),
)

export { initialSync, nextSync }
