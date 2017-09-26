import { find, propEq, pipe, prop } from 'ramda'
import render from '../util/render'
import write from '../util/write'
import Markdown from './components/markdown'

export default pipe(
  prop('staticContent'),
  find(propEq('location', 'Biography')),
  ({ content }) => (
    <Markdown id="biography-content" content={content} />
  ),
  render,
  write('build/biography.html')
)
