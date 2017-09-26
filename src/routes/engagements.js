import render from '../util/render'
import Layout from '../components/layout'
import engagements from '../../data/engagements.json'

export default ({ path }) => [
  [
    path,
    render(
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
    ),
  ],
]
