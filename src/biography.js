import { find, propEq, pipe, prop } from 'ramda'
import render from './util/render'
import write from './util/write'
import Biography from './components/biography'

export default pipe(
  prop('staticContent'),
  find(propEq('location', 'Biography')),
  home => <Biography {...home} />,
  render,
  write('build/biography.html')
)
