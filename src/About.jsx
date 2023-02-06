import Segments from './Segments';
import './About.css';
import { useState, useEffect } from 'react';

function About() {

  const [value,setValue] = useState(9999);

  function getRandomInt() {
    return Math.floor(Math.random() * 9999);
  }

	useEffect(() => {
		const interval = setInterval(() => {
			setValue(getRandomInt());
		}, 5000);
		return () => clearInterval(interval);
	}, [value]);

  return (
    <>
			<div className='section-split'>
				<div className='left align-top'>
          <div className='paragraph-wrapper'>
            <div className='margin-top-bottom'>
            <h1>About UINTS</h1>
            <div className='definition'>
              <p className='def-title'>uint (yoo-int)</p>
              <p className='def-subtitle'>definiton: a programming term for an unsigned integer.</p>
            </div>
            <p>We're used to seeing art in nfts, but numbers hold an undeniable significance in the way we interact with and value these tokens. Rarity, supply, IDs, prices… These are all just numbers, but sometimes they become more significant to us than the art itself.</p>
            <p>This is an experiment to bring numbers to the spotlight. Numbers are the art, and just as paint on a canvas, or pixels on a screen, these numbers can convey meaning beyond the means.</p>
            <p>Each token in the UINTS collection is assigned a random number to start, fully on-chain. The art is created using the age-old way of communicating numbers: the seven-segment display.</p>
            <p>Four digits, seven segments per digit, twenty-eight segments total. Together, these segments can display any number between 1 and 9,999.</p>
            <p>Numbers are primed to be combined, and there will be an option to burn tokens and add their values together. Since numbers are art, this makes you the artist.</p>
            </div>
            <div className='margin-top-bottom'>
            <h2 className='subheading'>Minting:</h2>
            <p>UINTS are available to mint on the Ethereum blockchain in phases. The first phase lasts until token 1000 is minted. During that time, tokens will get a random value between 1 and 50.</p>
            <p>After token 1000 is minted, a 24 hour timer programmed into the contract will start, and the max value assigned to new tokens will drop by 5 for each thousand tokens minted. (i.e. tokens 1000-1999 will get a max value of 45, tokens 2000-2999 will get a max value of 40, and so on).</p>
            <p>If token 5000 is minted before the timer runs out, a new (final) countdown for 24 hours will be started. Max values will continue to decrease by 5 until 10000 tokens are minted, at which point any new tokens will be assigned a value of 1.</p>
            </div>
            <div className='margin-top-bottom'>
            <h2 className='subheading'>Combining:</h2>
            <p>There is already a combine (burn) mechanism built into the contract, ready to be activated sometime after minting is closed. Combine tokens to get a higher value. The largest number possible is 9999.</p>
            <p>Combining numbers will have an affect on the art, as new numbers will be assigned a random color. More details to come when this functionality is activated.</p>
            </div>
            <div className='margin-top-bottom'>
            <h2 className='subheading'>Utility:</h2>
            <p>This is just art, these are just numbers. Ask yourself: “What if all I get are nfts?” and participate accordingly.</p>
            <p>-Parker</p>
            </div>
          </div>
				</div>
				<div className='right disable-scroll'>
						<div className='counter-wrapper'>
							<div className='counter-card'>
								<Segments value={value} />
								<p className='counter-label'>Numbers are art</p>
							</div>
						</div>
				</div>
			</div>
    </>
  )
}

export default About;