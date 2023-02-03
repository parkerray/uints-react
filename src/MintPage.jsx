import MintForm from './MintForm';
import Segments from './Segments';
import { useState, useEffect } from 'react';

import { getTotalSupply } from '../alchemyAPI';

function MintPage() {
	const [supply,setSupply] = useState(9999);

	const calculateMinutes = () => {
		let targetTime = new Date('2023-02-04T00:00:00Z');
		let currentTime = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), new Date().getUTCHours(), new Date().getUTCMinutes(), new Date().getUTCSeconds()));

		let remainingTime = (targetTime - currentTime) / 1000;
		let result = Math.floor(remainingTime / 60);
		return result;
	}

	const [minutes,setMinutes] = useState(9999);
	getSupply();

	// useEffect(() => {
	// 	const countdownInterval = setInterval(() => {
	// 		setMinutes(calculateMinutes());
	// 	}, 60000);
	// 	return () => clearInterval(countdownInterval);
	// }, []);

	function getSupply() {
		getTotalSupply().then(result => {
			if (result.totalSupply != supply) {
				setSupply(result.totalSupply)
			}
		}
		)
	}

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		getSupply();
	// 	}, 10000);
	// 	return () => clearInterval(interval);
	// }, []);

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
								<Segments value={minutes} />
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