export default () => (
  <div id="contact-wrap">
    <div id="contact">
      <div id="contact-form-wrap">
        <form id="contact-form" name="contact" data-netlify-honeypot="bot-field" data-netlify>
          <ul className="first-half">
            <li><h3>Contact Amy</h3></li>
            <li className="name">
              <label className="required" for="id_name">Name:</label>
              <input type="text" name="name" id="id_name" />
            </li>
            <li className="email">
              <label className="required" for="id_email">Email:</label>
              <input type="text" name="email" id="id_email" />
            </li>
            <li className="phone">
              <label className="required" for="id_phone">Phone:</label>
              <input id="id_phone" type="text" name="phone" maxlength="16" />
            </li>
          </ul>
          <ul className="second-half">
            <li className="message">
              <label className="required" for="id_message">Message:</label>
              <textarea id="id_message" rows="10" cols="40" name="message"></textarea>
            </li>
            <li><input className="submit" type="submit" name="submit" value="send" /></li>
          </ul>
          <div className="bot-field">
            <input name="bot-field" />
          </div>
        </form>
      </div>
    </div>
    <div id="contact-bottom-grad"></div>
  </div>
)
