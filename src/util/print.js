import { inspect } from 'util'
import { tap } from 'ramda'

export default tap(x => console.log(inspect(x, { depth: 99 })))
