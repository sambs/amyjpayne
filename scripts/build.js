#! /usr/bin/env node

require('babel-register')

const { resolve } = require('path')
const { tap, pipeP } = require('ramda')
const parseArgs = require('minimist')
const rmdir = require('rmfr')
const mkdirp = require('mkdirp-promise')
const { initialSync, nextSync } = require('../src/data')
const { default: build } = require('../src/static')
const { default: cpr } = require('../src/util/cpr')

const dataDir = resolve(`${__dirname}/../data`)
const buildDir = resolve(`${__dirname}/../build`)

const options = {
  boolean: ['watch'],
  alias: {
    w: 'watch',
  },
}

const args = parseArgs(process.argv.slice(2), options)

const run = pipeP(
  () => rmdir(buildDir),
  () => rmdir(dataDir),
  () => mkdirp(dataDir),
  initialSync,
  tap(() => console.log(args.watch ? 'Initial sync complete' : 'Data fetched')),
  nextSyncToken => Promise.all([
    build(),
    args.watch ? nextSync(nextSyncToken) : null,
  ]),
  () => cpr('public/', buildDir)
)

run().catch(console.error)
