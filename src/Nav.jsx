import './Nav.css'
import { Link } from 'react-router-dom'

function Nav() {

  return (
    <nav className="nav">
      <Link to ={`/`}>
        <img id="logo" src="/logo.svg" />
      </Link>
      <div className="nav-links">
        <Link to={`/about`}>About</Link>
        <Link to={`/mint`}>Mint</Link>
      </div>
    </nav>
  )
}

export default Nav