import { writeFile } from 'fs'
import { curry } from 'ramda'

export default curry((path, contents) =>
  new Promise((resolve, reject) =>
    writeFile(path, contents, error =>
      error ? reject(error) : resolve()
    )
  )
)
