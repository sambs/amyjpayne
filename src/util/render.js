import ReactDOMServer from 'react-dom/server'

export default element => `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Amy J Payne</title>
  <link rel="stylesheet" href="/styles/main.css" type="text/css" media="screen"/>
</head>
<body>
  <div id="header-wrap">
    <div id="header">
      <h1><a href="/"><img src="/images/logo.png" alt="Amy J Payne"></a></h1>
      <ul id="main-nav">
        <li><a href="/"></a></li>
        <li><a href="/biography.html">Biography</a></li>
        <li><a href="/engagements.html/">Engagements</a></li>
        <li><a id="contact-link" href="#">Contact</a></li>
        <li><a href="/media.html">Media</a></li>
      </ul>
      </div>
  </div>
  <div id="contact-wrap">
    <div id="contact">
      <div id="contact-form-wrap">
        <form id="contact-form" name="contact" netlify-honeypot="bot-field" netlify>
          <div class="bot-field">
            <input name="bot-field" />
          </div>
          <ul class="first-half">
            <li><h3>Contact Amy</h3></li>
            <li class="name">
              <label class="required" for="id_name">Name:</label>
              <input type="text" name="name" id="id_name" />
            </li>
            <li class="email">
              <label class="required" for="id_email">Email:</label>
              <input type="text" name="email" id="id_email" />
            </li>
            <li class="phone">
              <label class="required" for="id_phone">Phone:</label>
              <input id="id_phone" type="text" name="phone" maxlength="16" />
            </li>
          </ul>
          <ul class="second-half">
            <li class="message">
              <label class="required" for="id_message">Message:</label>
              <textarea id="id_message" rows="10" cols="40" name="message"></textarea>
            </li>
            <li><input class="submit" type="submit" name="submit" value="send" /></li>
          </ul>
        </form>
      </div>
    </div>
    <div id="contact-bottom-grad"></div>
  </div>
  <div id="wrap">
    <div id="body">
      ${ReactDOMServer.renderToStaticMarkup(element)}
    </div>
    <div id="footer">
      <div id="copyright">© 2017 Amy J Payne</div>
    </div>
  </div>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
  <script src="/scripts/main.js"></script>
</body>
</html>`
//<script src="/scripts/fancyzoom/js/fancyzoom.min.js"></script>
//<script src="/scripts/lightbox/js/jquery.prettyphoto_min.js"></script>
