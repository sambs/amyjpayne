import { exec } from 'child_process'
import { curry } from 'ramda'

export default curry((src, dest) =>
  new Promise((resolve, reject) =>
    exec(`cp -r ${src} ${dest}`, error =>
      error ? reject(error) : resolve()
    )
  )
)

