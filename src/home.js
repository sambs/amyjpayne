import { find, propEq, pipe, prop } from 'ramda'
import render from './util/render'
import write from './util/write'
import Home from './components/home'

export default pipe(
  prop('staticContent'),
  find(propEq('location', 'Home')),
  home => <Home {...home} />,
  render,
  write('build/index.html')
)
