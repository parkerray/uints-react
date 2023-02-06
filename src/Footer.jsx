import './Footer.css'

function Footer() {

  return (
    <footer className='footer-wrapper'>
      <div className='footer-left'>
        <span>UINTS</span>
      </div>
      <div className='footer-right'>
        <a href='https://etherscan.io/address/0x7C10C8816575e8Fdfb11463dD3811Cc794A1D407#code'>
          <img className='icon' src='../etherscan.svg' alt='etherscan'></img>
        </a>
        <a href='https://twitter.com/uintsnft'>
          <img className='icon' src='../twitter.svg' alt='twitter'></img>
        </a>
        <a href='https://blur.io/collection/uints'>
          <img className='icon' src='../blur.png' alt='blur'></img>
        </a>
        <a href='https://opensea.io/collection/uints'>
          <img className='icon' src='../os.svg' alt='opensea'></img>
        </a>
      </div>
    </footer>
  )

}

export default Footer;