import React from 'react'
import { map } from 'ramda'
import classNames from 'classnames'
import Layout from '../components/layout'

const render = ({ path, context: { items, upcoming, pages } }) =>
  <Layout path={path}>
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
                key={number}
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

export default render
