import MintForm from './MintForm';
import Segments from './Segments';
import { useState, useEffect } from 'react';

import { getTotalSupply } from '../alchemyAPI';

function MintPage() {
	const [supply,setSupply] = useState(0);

	function getSupply() {
		getTotalSupply().then(result => setSupply(result.totalSupply))
	}

	useEffect(() => {
		const interval = setInterval(() => {
			getSupply();
		}, 10000);
		return () => clearInterval(interval);
	}, []);

	getSupply();

  return (
    <>
			<div className='section-split'>
				<div className='left disable-scroll'>
					<MintForm />
				</div>
				<div className='right disable-scroll'>
					<div className='container disable-scroll'>
						<div className='counter-wrapper'>
							<div className='counter-card'>
								<Segments value={supply} />
								<p className='counter-label'>Minted</p>
							</div>
							<div className='counter-card'>
								<Segments value={32} />
								<p className='counter-label'>Minutes left</p>
							</div>
						</div>
					</div>
				</div>
			</div>
    </>
  );
}

export default MintPage;