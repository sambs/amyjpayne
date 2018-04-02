import React from 'react'
import Layout from '../components/layout'
import Markdown from '../components/markdown'
import staticContent from '../../data/staticContent.json'

export default ({ path, context: { content } }) =>
  <Layout path={path}>
    <Markdown id="biography-content" content={content} />
  </Layout>

