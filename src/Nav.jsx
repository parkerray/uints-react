import './Nav.css'

function Nav() {

  return (
    <nav className="nav">
      <a href="/">
        <img id="logo" src="/logo.svg" />
      </a>
      <div className="nav-links">
        <a href="/">About</a>
        <a href="/">Mint</a>
      </div>
    </nav>
  )
}

export default Nav