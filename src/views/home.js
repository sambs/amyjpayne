import React from 'react'
import Markdown from '../components/markdown'
import Layout from '../components/layout'

export default ({ path, context: { content } }) =>
  <Layout path={path}>
    <div>
      <img id="homepage-image" src="/images/amyp-main.jpg" />
      <div>
        <Markdown id="homepage-content" content={content} />
        <div id="homepage-images">
          <h4>LATEST PHOTOS</h4>
        </div>
        <div id="homepage-featured-gig">
        </div>
      </div>
    </div>
  </Layout>
