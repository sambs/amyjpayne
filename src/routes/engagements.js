import { route, routes } from '../util/routes'
import Layout from '../components/layout'
import engagements from '../../data/engagements.json'

const render = route(() =>
  <Layout>
    <ul className="engagements">
      {engagements.map(({ id, title, dateDescription, location, description, link }) => (
        <li key={id} className="engagement">
          <h3 className="engagement-title">{title}</h3>
          <div className="engagement-details">
            <span className="engagement-dtstart">{dateDescription}</span>
            - <span className="engagement-location">{location}</span>
          </div>
          <div className="engagement-description">
            <p>{description}</p>
          </div>
          {link && <a className="engagement-link" href={link}>More info</a>}
        </li>
      ))}
    </ul>
  </Layout>
)

export default routes([
  [ '/', render ],
  [ '/past', render ],
])
