import { Fragment } from 'react'
import { find, propEq } from 'ramda'
import { route } from '../util/routes'
import Layout from '../components/layout'
import Markdown from '../components/markdown'
import staticContent from '../../data/staticContent.json'
import galleries from '../../data/gallery.json'

const { content } = find(propEq('location', 'Media'), staticContent)
const { images } = find(propEq('location', 'Media'), galleries)

export default route(({ path }) =>
  <Layout path={path}>
    <Fragment>
      <Markdown className="media-left" content={content} />
      <div className="media-right">
        <ul className="lightbox-thumbs">
          {images.map(({ id, title, file: { url } }) => (
            <li key={id}>
              <a href={url} rel="prettyPhoto[g]" title={title}>
                <img src={`${url}?w=80&h=80`} width="80" height="80" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  </Layout>
)
