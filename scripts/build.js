#! /usr/bin/env node

require('babel-register')

const parseArgs = require('minimist')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config')
const fetchData = require('../src/data')

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

fetchData.default()
  .then(() => console.log('Data fetched'))
  .then(runWebpack)
  .catch(console.error)
