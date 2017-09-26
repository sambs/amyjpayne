#! /usr/bin/env node

require('babel-register')

const { resolve } = require('path')
const { pipeP } = require('ramda')
const parseArgs = require('minimist')
const rmdir = require('rmfr')
const mkdirp = require('mkdirp-promise')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config')
const fetchData = require('../src/data')

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
  if (args.watch) compiler.watch({}, callback)
  else compiler.run(callback)
}

const run = pipeP(
  () => rmdir(webpackConfig.output.path),
  () => rmdir(dataDir),
  () => mkdirp(dataDir),
  fetchData.default,
  () => console.log('Data fetched'),
  runWebpack
)

run().catch(console.error)
