import MintForm from './MintForm';
import Segments from './Segments';
import { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi'

import { getTotalSupply } from '../alchemyAPI';

function MintPage() {
	const [supply,setSupply] = useState('');
	const [minutes,setMinutes] = useState('');
	const contractAddress = '0xdaD6Ff0Eee96436FA50028C9d88EF308E81DD11E';

	const { data } = useContractRead({
    address: contractAddress,
    abi: [{
			"inputs": [],
			"name": "getMinutesRemaining",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}],
    functionName: 'getMinutesRemaining',
		onSuccess(data) {
			setMinutes(parseInt(data._hex, 16));
		}
  })

	useEffect(() => {
		setInterval(() => {
			setMinutes(parseInt(data._hex, 16));
		}, 10000);
  }, []);

	useEffect(() => {
    getTotalSupply(contractAddress).then(supply => {
      setSupply(supply == undefined ? 0 : supply);
    });
  }, [contractAddress]);

  return (
    <>
			<div className='section-split'>
				<div className='left disable-scroll'>
					<MintForm contractAddress={contractAddress} cost={3000000000000000} />
				</div>
				<div className='right disable-scroll'>
					<div className='container disable-scroll'>
						<div className='counter-wrapper'>
							<div className='counter-card'>
								<Segments value={supply} />
								<p className='counter-label'>Minted</p>
							</div>
							{minutes != 0 && (<div className='counter-card'>
								<Segments value={minutes} />
								<p className='counter-label'>Minutes left</p>
							</div>)}
						</div>
					</div>
				</div>
			</div>
    </>
  );
}

export default MintPage;