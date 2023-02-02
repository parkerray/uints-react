import Segments from './Segments';

function About() {
  return (
    <>
			<div className='section-split'>
				<div className='left align-top'>
          <div className='paragraph-wrapper'>
            <h1>About Uints</h1>
            <p>
              Uint is a technical term for an unsigned integer. Simply put, a uint is a positive number.
            </p>
            <p>
              This project (UINTS) is a collection of NFTs that are stored and rendered fully on-chain. Each token is mapped to a value, and that value is represented visually through a seven-segment style display.
            </p>
            <p>
              What's the gameplan? Uints are available to mint on the Ethereum blockchain for a limited time. Each token will be assigned a value of 1, 10, or 100. Lower numbers are more common than higher numbers.
            </p>
            <p>
              At some point after the minting period ends, a contract function will be activated in the smart contract. Combine (burn) tokens to add their values together. 1+1=2, 100+2=102, etc. The largest number possible is 9999.
            </p>
            <p>
              What do you get for having big numbers? Nothing, except for the NFT. There is no utility, just art, just numbers.
            </p>
            <p>
              Please participate responsibly. Ask yourself: “Do I care if I spend money on this project and all I get are NFTs?”
            </p>
            <p>
              If your answer is yes, please do not waste your hard-earned money here. This is not an investment, this is just art, these are just numbers.
            </p>
            <p>
              -Parker
            </p>
          </div>
				</div>
				<div className='right'>
					<div className='container'>
						<div className='counter-wrapper'>
							<div className='counter-card'>
								<Segments value={3041} />
								<p className='counter-label'>Minted</p>
							</div>
						</div>
					</div>
				</div>
			</div>
    </>
  )
}

export default About;