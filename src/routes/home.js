import { compose, map, head, filter, sortBy, prop, evolve, find, propEq } from 'ramda'
import { route } from '../util/routes'
import Markdown from '../components/markdown'
import Layout from '../components/layout'
import mainImage from '../images/amyp-main.jpg'
import staticContent from '../../data/staticContent.json'
import engagements from '../../data/engagements.json'
import galleries from '../../data/gallery.json'

const { content } = find(propEq('location', 'Home'), staticContent)
const { images } = find(propEq('location', 'Home'), galleries)

const now = new Date()

const engagement = compose(
  head,
  sortBy(prop('date')),
  filter(({ date }) => date > now),
  map(evolve({ date: d => new Date(d) })),
)(engagements)

export default route(({ path }) =>
  <Layout path={path}>
    <div>
      <img id="homepage-image" src={mainImage} />
      <div id="homepage-content">
        <Markdown content={content} />
        <div id="homepage-images">
          <h4>LATEST PHOTOS</h4>
          {images.map(({ id, title, file: { url } }) => (
            <a key={id} href={url} class="fancyzoom">
              <img src={`${url}?w=79&h=120`} alt={title} />
            </a>
          ))}
        </div>
        {engagement &&
          <div id="homepage-featured-gig" className="events">
            <h4>NEXT ENGAGEMENT</h4>
            <div>
              <h3 className="engagement-title">{engagement.title}</h3>
              <div className="engagement-details">
                <span className="engagement-dtstart">{engagement.dateDescription}</span>
              - <span className="engagement-location">{engagement.location}</span>
              </div>
              <div className="engagement-description">
                <p>{engagement.description}</p>
              </div>
              <a className="engagement-url" href={engagement.link}>More info</a>
            </div>
          </div>
        }
      </div>
    </div>
  </Layout>
)
