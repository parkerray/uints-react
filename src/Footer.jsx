import './Footer.css'

function Footer() {

  return (
    <footer className='footer-wrapper'>
      <div className='footer-left'>
        <span>UINTS</span>
      </div>
      <div className='footer-right'>
        <a href='/'>
          <img className='icon' src='../etherscan.svg' alt='etherscan'></img>
        </a>
        <a href='/'>
          <img className='icon' src='../twitter.svg' alt='twitter'></img>
        </a>
        <a href='/'>
          <img className='icon' src='../blur.png' alt='blur'></img>
        </a>
        <a href='/'>
          <img className='icon' src='../os.svg' alt='opensea'></img>
        </a>
      </div>
    </footer>
  )

}

export default Footer;