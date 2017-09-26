import { find, propEq, pipe, prop } from 'ramda'
import render from '../util/render'
import write from '../util/write'
import Markdown from './components/markdown'

export default pipe(
  prop('staticContent'),
  find(propEq('location', 'Home')),
  ({ content }) => (
    <div>
      <img id="homepage-image" src="/images/amyp-main.jpg" />
      <div>
        <Markdown id="homepage-content" content={content} />
        <div id="homepage-images">
          <h4>LATEST PHOTOS</h4>
        </div>
        <div id="homepage-featured-gig">
        </div>
      </div>
    </div>
  ),
  render,
  write('build/index.html')
)
