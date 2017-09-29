import { partition, compose, splitEvery, map, evolve, reverse, sortBy, prop, over, lensIndex } from 'ramda'
import classNames from 'classnames'
import { route, routes, paged } from '../util/routes'
import Layout from '../components/layout'
import engagements from '../../data/engagements.json'

const now = new Date()

const [ past, upcoming ] = compose(
  over(lensIndex(0), compose(splitEvery(10), reverse)),
  partition(e => e.date < now),
  sortBy(prop('date')),
  map(evolve({ date: d => new Date(d) })),
)(engagements)

const render = route(({ path, items, upcoming, pages }) => console.log(path, pages) ||
  <Layout>
    <div>
      <div className="engagement-nav">
        <a
          className={classNames({ 'engagement-nav-item': true, active: upcoming })}
          href="/engagements/"
          children="Upcoming"
        />
        <a
          className={classNames({ 'engagement-nav-item': true, active: !upcoming })}
          href="/engagements/past/"
          children="Past"
        />
        {pages && (
          <span>
            {pages.map(({ number, path: pagePath }) => (
              <a
                className={classNames({ 'engagement-nav-item': true, active: path == pagePath })}
                href={pagePath}
                children={number}
              />
            ))}
          </span>
        )}
      </div>
      <ul className="engagements">
        {map(
          ({ id, title, dateDescription, location, description, link }) => (
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
          ),
          items
        )}
      </ul>
    </div>
  </Layout>
)

export default routes([
  [ '/', render, { items: upcoming, upcoming: true } ],
  [ '/past', paged(render, past, { upcoming: false }) ],
])
