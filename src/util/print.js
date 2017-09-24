import { inspect } from 'util'

export default x => console.log(inspect(x, { depth: 99 }))
