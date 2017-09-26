import { Children } from 'react'
import styles from '../styles/main.css'
import Header from './header'
import ContactForm from './contact'

const Layout = ({ children }) => (
  <html lang="en">
    <head>
      <title>Amy J Payne</title>
      <link rel="stylesheet" href={styles} type="text/css" media="screen"/>
    </head>
    <body>
      <Header />
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
      <script src="/scripts/main.js"></script>
    </body>
  </html>
)

//<script src="/scripts/fancyzoom/js/fancyzoom.min.js"></script>
//<script src="/scripts/lightbox/js/jquery.prettyphoto_min.js"></script>

export default Layout
