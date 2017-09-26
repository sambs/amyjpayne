import rmdir from 'rmfr'
import mkdirp from 'mkdirp-promise'
import copy from 'recursive-copy'
import handleError from './util/error'
import { pipeP } from 'ramda'
import { BUILD_PATH } from '../config'
import data from './data'
import engagements from './sections/engagements'
import home from './sections/home'
import biography from './sections/biography'

const sections = [ home, biography, engagements ]

const buildSections = data =>
  Promise.all(sections.map(section => section(data)))

export default ({ useDataCache }) =>
  pipeP(
    () => rmdir(BUILD_PATH),
    () => mkdirp(BUILD_PATH),
    () => mkdirp('data'),
    () => copy(`${__dirname}/static`, BUILD_PATH),
    () => useDataCache || data(),
    () => ({
      assets: require('../data/assets.json'),
      engagements: require('../data/engagements.json'),
      staticContent: require('../data/staticContent.json'),
    }),
    buildSections,
    () => console.log('Built'),
  )().catch(handleError)
