import { find, propEq } from 'ramda'
import { route } from '../util/routes'
import Layout from '../components/layout'
import Markdown from '../components/markdown'
import staticContent from '../../data/staticContent.json'

const { content } = find(propEq('location', 'Biography'), staticContent)

export default route(() =>
  <Layout>
    <Markdown id="biography-content" content={content} />
  </Layout>
)
