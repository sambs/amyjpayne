import { apply, compose, endsWith, head, map, pipe, pipeP, when, uniq } from 'ramda'
import { dirname } from 'path'
import render from './util/render'
import tapP from './util/tap-p'
import wait from './util/wait'
import mkdirp from 'mkdirp'
import write from './util/write'
import root from './controllers'

const allP = jobs => Promise.all(jobs)

const urlToFilePath = pipe(
  when(endsWith('/'), path => `${path}index`),
  path => `build${path}.html`
)

const mkdirs = compose(
  wait(50),
  allP,
  map(mkdirp),
  uniq,
  map(dirname),
  map(head)
)

const build = pipeP(
  () => Promise.resolve('/'),
  root,
  map(([ path, view, context = {} ]) => ([ path, view({ path, context }) ])),
  map(([ path, jsx ]) => ([ urlToFilePath(path), render(jsx) ])),
  tapP(mkdirs),
  map(apply(write)),
  allP
)

export default build
