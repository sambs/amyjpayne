import { writeFile } from 'fs'
import { curry } from 'ramda'

//join('./build', path)
//import { join } from 'path'

export default curry((path, contents) =>
  new Promise((resolve, reject) =>
    writeFile(path, contents, error =>
      error ? reject(error) : resolve()
    )
  )
)
