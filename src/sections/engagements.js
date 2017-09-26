import { pipe, prop } from 'ramda'
import render from '../util/render'
import write from '../util/write'

export default pipe(
  prop('engagements'),
  engagements => (
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
  ),
  render,
  write('build/engagements.html')
)
