import { exec } from 'child_process'
import { curry } from 'ramda'

export default cmd =>
  new Promise((resolve, reject) =>
    exec(cmd, error => error ? reject(error) : resolve())
  )
