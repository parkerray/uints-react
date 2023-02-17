import Segments from './Segments';
import './About.css';
import { useState, useEffect } from 'react';

function AboutCombining() {

  const [value,setValue] = useState(9999);

  const getRandomColors = () => {
    const base = Math.floor(Math.random() * 3);
    let temp = [];
    temp[base] = 255;
    for (let i = 0; i < 3; i++) {
      if (base != i) {
        temp[i] = Math.floor(Math.random() * 255);
      }
    }
    return [temp[0],temp[1],temp[2]];
  }

  const [colors, setColors] = useState(getRandomColors());

  function getRandomInt() {
    return Math.floor(Math.random() * 9999);
  }

	useEffect(() => {
		const interval = setInterval(() => {
			setValue(getRandomInt());
      setColors(getRandomColors())
		}, 5000);
		return () => clearInterval(interval);
	}, [value]);

  return (
    <>
			<div className='section-split'>
				<div className='left align-top'>
          <div className='paragraph-wrapper'>
            <div className='margin-top-bottom'>
            <h1>Combining UINTS</h1>
            <div className='definition'>
              <p className='def-title'>combine</p>
              <p className='def-subtitle'>definiton: to unite into a single number or expression.</p>
            </div>
            <p>Combining is a mechanism to burn UINTS tokens, adding their values together. Numbers are art, and we are artists.</p>
            </div>
            <div className='margin-top-bottom'>
            <h2 className='subheading'>Persistence:</h2>
            <p>You will choose which token to keep, and that token's 'ID' and 'Mint Phase' will not change.</p>
            <p>You will also choose which tokens to burn. Burned tokens will never be retrievable.</p>
            </div>
            <div className='margin-top-bottom'>
            <h2 className='subheading'>Numbers:</h2>
            <p>When you combine UINTS, the sum of all their number values will be added to the token you choose to keep.</p>
            <p>The highest possible number is 9999, and it can only be attained with perfect math. If the sum of token values are higher than 9999, they cannot be combined.</p>
            </div>
            <div className='margin-top-bottom'>
            <h2 className='subheading'>Colors:</h2>
            <p>The color for a token will be revealed the first time it is combined. If the same token is combined again, the color will not change.</p>
            <p>Colors are based on RGB (red, green, and blue) values. The levels of Red, Green, and Blue can be represented by numbers 0-255. These are used to render the art, and are stored in the token metadata.</p>
            <p>Each color will have a base color of Red, Green, or Blue. That base color will have a value of 255, and the other two colors will be have random values. This ensures the color is light enough to be seen on a dark background.</p>
            <p>Color possibilities and liklihood of certain colors are the same for any UINTS token, regardless of the ID, mint phase, or other factors.</p>
            </div>
            <div className='margin-top-bottom'>
            <h2 className='subheading'>Notice:</h2>
            <p>The combine function is handled on-chain. As long as your transaction is successfull, the metadata for the UINTS you kept will be updated on the blockchain.</p>
            <p>When tokens are successfully combined on the blockchain, updated metadata will be requested for the website. This could take a while, depending on the site traffic.</p>
            <p>If your metadata isn't updated right away, please wait a few minutes and come back later before combining again. Effort has been made to keep trying to update the metadata in the background.</p>
            <p>IMPORTANT: The outcome of combining tokens will be determined by the on-chain data, not the website. If your tokens on the site are not yet updated, the site will not be able to accurately predict the outcome of combining them.</p>
            <p>If tokens are out of sync, only combine them if you understand the risks involved. (Not recommended)</p>
            <p>In case you're unsure, it's recommended that you wait until the metadata is updated on the website before combining again.</p>
            </div>
            <div className='margin-top-bottom'>
            <h2 className='subheading'>Finally:</h2>
            <p>Thank you for taking the time to read through this page. If you're ready to combine, click below!</p>
            </div>
            <a className='button-outline no-margin' href='/combine'>Combine</a>
          </div>
				</div>
				<div className='right disable-scroll'>
						<div className='counter-wrapper'>
							<div className='counter-card'>
								<Segments value={value} colors={colors}/>
								<p className='counter-label'>Numbers are art</p>
							</div>
						</div>
				</div>
			</div>
    </>
  )
}

export default AboutCombining;