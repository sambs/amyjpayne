const Engagement = ({ title, dateDescription, location, description, link }) => (
  <li className="engagement">
    <h3 className="engagement-title">{title}</h3>
    <div className="engagement-details">
      <span className="engagement-dtstart">{dateDescription}</span>
      - <span className="engagement-location">{location}</span>
    </div>
    <div className="engagement-description">
      <p>{description}</p>
    </div>
    {link && <a className="engagement-link" href={link}>More info</a>}
  </li>
)

export default Engagement
