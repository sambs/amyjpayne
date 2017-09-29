import logo from '../images/logo.png'

const Header = () => (
  <div id="header-wrap">
    <div id="header">
      <h1><a href="/"><img src={logo} alt="Amy J Payne" /></a></h1>
      <ul id="main-nav">
        <li><a href="/"></a></li>
        <li><a href="/biography/">Biography</a></li>
        <li><a href="/engagements/">Engagements</a></li>
        <li><a href="/media/">Media</a></li>
        <li><a id="contact-link" href="#">Contact</a></li>
      </ul>
    </div>
  </div>
)

export default Header
