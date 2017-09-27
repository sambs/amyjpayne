import { find, propEq } from 'ramda'
import { route } from '../util/routes'
import Markdown from '../components/markdown'
import Layout from '../components/layout'
import mainImage from '../images/amyp-main.jpg'
import staticContent from '../../data/staticContent.json'

const { content } = find(propEq('location', 'Home'), staticContent)

export default route(() =>
  <Layout>
    <div>
      <img id="homepage-image" src={mainImage} />
      <div>
        <Markdown id="homepage-content" content={content} />
        <div id="homepage-images">
          <h4>LATEST PHOTOS</h4>
        </div>
        <div id="homepage-featured-gig">
        </div>
      </div>
    </div>
  </Layout>
)
