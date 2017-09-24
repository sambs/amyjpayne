#! /usr/bin/env node

require('babel-register')

global.React = require('react')

const parseArgs = require('minimist')
const run = require('../src')

const options = {
  boolean: ['useDataCache'],
  alias: {
    c: 'useDataCache',
  },
}

const args = parseArgs(process.argv.slice(2), options)

run.default(args).catch(console.error)
