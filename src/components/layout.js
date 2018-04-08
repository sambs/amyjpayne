import { Children } from 'react'
import styles from '../styles/main.css'
import Header from './header'
import ContactForm from './contact'

const prettyPhotoStyles = '//cdn.jsdelivr.net/gh/scaron/prettyphoto@3.1.6/css/prettyPhoto.css'
const fancyZoomStyles = '//cdn.jsdelivr.net/gh/keegnotrub/jquery.fancyzoom@1.0.2/css/fancyzoom.css'

const Layout = ({ path, children }) => (
  <html lang="en">
    <head>
      <title>Amy J Payne</title>
      <link rel="stylesheet" href={prettyPhotoStyles} type="text/css" media="screen"/>
      <link rel="stylesheet" href={fancyZoomStyles} type="text/css" media="screen"/>
      <link rel="stylesheet" href={styles} type="text/css" media="screen"/>
    </head>
    <body>
      <Header path={path} />
      <ContactForm />
      <div id="wrap">
        <div id="body">
          {Children.only(children)}
        </div>
        <div id="footer">
          <div id="copyright">© 2017 Amy J Payne</div>
        </div>
      </div>
      <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
      <script src="//cdn.jsdelivr.net/gh/scaron/prettyphoto@3.1.6/js/jquery.prettyPhoto.js"></script>
      <script src="//cdn.jsdelivr.net/gh/keegnotrub/jquery.fancyzoom@1.0.2/js/jquery.fancyzoom.min.js"></script>
      <script src="/scripts/main.js"></script>
    </body>
  </html>
)

//<script src="/scripts/fancyzoom/js/fancyzoom.min.js"></script>

export default Layout
