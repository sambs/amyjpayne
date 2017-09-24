import rmdir from 'rmfr'
import mkdirp from 'mkdirp-promise'
import copy from 'recursive-copy'
import handleError from './util/error'
import { pipeP } from 'ramda'
import { BUILD_PATH } from '../config'
//import engagements from './engagements'
import home from './home'
import biography from './biography'
import data from './data'

const sections = [ home, biography ]
//const sections = [ home, engagements ]

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
  )().catch(handleError)
