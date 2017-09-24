import { pipe, path, tap, when } from 'ramda'

export default pipe(
  when(
    path([ 'response', 'data', 'message' ]),
    path([ 'response', 'data', 'message' ]),
  ),
  tap(console.error),
  () => process.exit(1),
)
