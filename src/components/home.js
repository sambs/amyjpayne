import Markdown from './markdown'

const Home = ({ content }) => (
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
)

export default Home
