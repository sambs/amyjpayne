import { writeFile, readFile } from 'fs'
import { curry } from 'ramda'
import { DATA_DIR } from '../../config'

export const write = curry((name, contents) =>
  new Promise((resolve, reject) =>
    writeFile(
      DATA_DIR + name,
      JSON.stringify(contents, null, 2),
      error => error ? reject(error) : resolve()
    )
  )
)

export const read = curry(name =>
  new Promise((resolve, reject) =>
    readFile(DATA_DIR + name, (error, json) => 
      error ? reject(error) : resolve(JSON.parse(json))
    )
  )
)
