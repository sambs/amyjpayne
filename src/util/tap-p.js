import { curry, always } from 'ramda'

module.exports = curry((func, value) =>
  Promise.resolve(func(value)).then(always(value))
)
