#! /usr/bin/env node

require('babel-register')

const { resolve } = require('path')
const { tap, pipeP } = require('ramda')
const parseArgs = require('minimist')
const rmdir = require('rmfr')
const mkdirp = require('mkdirp-promise')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config')
const { initialSync, nextSync } = require('../src/data')

const dataDir = resolve(`${__dirname}/../data`)

const options = {
  boolean: ['watch'],
  alias: {
    w: 'watch',
  },
}

const args = parseArgs(process.argv.slice(2), options)

const compiler = webpack(webpackConfig)

const callback = (err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    return
  }

  console.log(stats.toString())

  const info = stats.toJson()

  if (stats.hasErrors()) {
    console.error(info.errors)
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }
}

const runWebpack = () => {
  console.log('run')
  if (args.watch) compiler.watch({}, callback)
  else compiler.run(callback)
}

const run = pipeP(
  () => rmdir(webpackConfig.output.path),
  () => rmdir(dataDir),
  () => mkdirp(dataDir),
  initialSync,
  tap(() => console.log(args.watch ? 'Initial sync complete' : 'Data fetched')),
  nextSyncToken => Promise.all([
    runWebpack(),
    args.watch ? nextSync(nextSyncToken) : null,
  ])
)

run().catch(console.error)
