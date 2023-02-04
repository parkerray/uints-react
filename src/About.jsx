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
            <p>Each token in the UINTS collection is assigned a pseudo-random number based on the supply of tokens at mint. That number is stored and rendered fully on-chain. The art is created using the age-old way of communicating numbers: the seven-segment display.</p>
            <p>Four digits, seven segments per digit, twenty-eight segments total. Together, these segments can display any number between 1 and 9,999. UINTS are primed to be combined, and there will be an option to burn tokens and add their numbers together. Since numbers are art, this makes you the artist.</p>
            </div>
            <div className='margin-top-bottom'>
            <h2 className='subheading'>Minting:</h2>
            <p>UINTS are available to mint on the Ethereum blockchain in phases. Each phase will progress based on the number of tokens minted, and the possible token values change during each phase. In short, the lower the supply, the higher the values could be.</p>
            <ul>
              <li className='toplist'>
                Tokens 1-1000 (phase 1)
                <ul className='sublist'>
                  <li>Time limit: 24 hours from token 1000 being minted</li>
                  <li>Possible numbers: 1, 10, or 100</li>
                </ul>
              </li>
            </ul>
            <ul>
              <li className='toplist'>
                Tokens 1001-5000 (phase 2)
                <ul className='sublist'>
                  <li>Time limit: 24 hours from token 5000 being minted</li>
                  <li>Possible numbers: 1 or 10</li>
                  <li>Note: if 5000 tokens are not minted before the time limit, phase 3 will not start</li>
                </ul>
              </li>
            </ul>
            <ul>
              <li className='toplist'>
                Tokens 5001+ (phase 3)
                <ul className='sublist'>
                  <li>Time limit: none</li>
                  <li>Possible values: 1</li>
                </ul>
              </li>
            </ul>
            </div>
            <div className='margin-top-bottom'>
            <h2 className='subheading'>Combining:</h2>
            <p>There is already a combine (burn) mechanism built into the contract, ready to be activated sometime after minting is closed. Combine tokens to get a higher value. The largest number possible is 9999.</p>
            <p>When numbers are combined for the first time, the token kept will be assigned a new color randomly. This color will persist in future combinations, as long as that token is the root. More details to come when this functionality is activated.</p>
            </div>
            <div className='margin-top-bottom'>
            <h2 className='subheading'>Utility:</h2>
            <p>This is just art, these are just numbers. Please participate responsibly. Ask yourself: “What if all I get are nfts?”</p>
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