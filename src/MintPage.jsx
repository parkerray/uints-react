import MintForm from './MintForm';
import Segments from './Segments';
import { useState, useEffect } from 'react';

import { getTotalSupply } from '../alchemyAPI';

function MintPage() {
	const [supply,setSupply] = useState('');
	const [minutes,setMinutes] = useState('');
	const contractAddress = '0xABc6908AD1fcF5B6974dBbfff29dC47Ebf82A59e';

	useEffect(() => {
    getTotalSupply(contractAddress).then(supply => {
      setSupply(supply);
    });
  }, [contractAddress]);

	useEffect(() => {
    const calculateMinutes = () => {
      let targetTime = new Date('2023-02-05T00:00:00Z');
      let currentTime = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), new Date().getUTCHours(), new Date().getUTCMinutes(), new Date().getUTCSeconds()));

      let remainingTime = (targetTime - currentTime) / 1000;
      let result = Math.floor(remainingTime / 60);
      return result;
    };

    setMinutes(calculateMinutes());
  }, []);

  return (
    <>
			<div className='section-split'>
				<div className='left disable-scroll'>
					<MintForm contractAddress={contractAddress} cost={2000000000000000} />
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