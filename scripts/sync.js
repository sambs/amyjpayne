#! /usr/bin/env node

require('babel-register')

const { resolve } = require('path')
const { pipeP, tap } = require('ramda')
const parseArgs = require('minimist')
const rmdir = require('rmfr')
const mkdirp = require('mkdirp-promise')
const { initialSync, nextSync } = require('../src/data')

const dataDir = resolve(`${__dirname}/../data`)

const options = {
  boolean: ['watch'],
  alias: {
    w: 'watch',
  },
}

const args = parseArgs(process.argv.slice(2), options)

const run = pipeP(
  () => rmdir(dataDir),
  () => mkdirp(dataDir),
  initialSync,
  tap(() => console.log(args.watch ? 'Initial sync complete' : 'Data fetched')),
  nextSyncToken => args.watch ? nextSync(nextSyncToken) : null
)

run().catch(console.error)
