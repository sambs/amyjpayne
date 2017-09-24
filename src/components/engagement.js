export default ({ title, dateDescription, description }) => (
  <div id="project-event-122">
    <li>
      <h3 className="summary">{title}</h3>
      <div className="details"><span className="dtstart">{dateDescription}</span>
      - <span className="location">Leeds, Hull, Nottingham, Newcastle, and Salford.</span>
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
      <a className="url" href="http://www.operanorth.co.uk/">More info</a>
    </li>
  </div>
)
