import { find, propEq } from 'ramda'
import render from '../util/render'
import Layout from '../components/layout'
import Markdown from '../components/markdown'
import staticContent from '../../data/staticContent.json'

const { content } = find(propEq('location', 'Biography'), staticContent)

export default ({ path }) => [
  [
    path,
    render(
      <Layout>
        <Markdown id="biography-content" content={content} />
      </Layout>
    ),
  ],
]
