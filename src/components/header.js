import { pipe, merge, map, startsWith } from 'ramda'
import classNames from 'classnames'
import logo from '../images/logo.png'

const pages = [
  { path: '/biography/', title: 'Biography' },
  { path: '/engagements/', title: 'Engagements' },
  { path: '/media/', title: 'Media' },
  { path: '/contact/', title: 'Contact' },
]

const Header = pipe(
  ({ path }) => map(
    page => merge(page, { active: path != '/' && startsWith(path, page.path) }),
    pages,
  ),
  pages => (
    <div id="header-wrap">
      <div id="header">
        <h1><a href="/"><img src={logo} alt="Amy J Payne" /></a></h1>
        <ul id="main-nav">
          {pages.map(({ path, title, active }) =>
            <li key={path}>
              <a
                id={`${title.toLowerCase()}-link`}
                className={classNames({ 'main-nav-item': true, 'active': active })}
                href={path}
                children={title}
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  ),
)

export default Header
