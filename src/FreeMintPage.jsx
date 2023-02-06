import FreeMintForm from './FreeMintForm';
import Segments from './Segments';
import { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi'

import { getTotalSupply } from '../web3api';

function MintPage() {
	const [supply,setSupply] = useState('');
	const [minutes,setMinutes] = useState('');
	const contractAddress = '0x7C10C8816575e8Fdfb11463dD3811Cc794A1D407';

	const { data, isError, isLoading } = useContractRead({
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
    getTotalSupply(contractAddress).then(supply => {
      setSupply(supply == undefined ? 0 : supply);
    });
  }, [contractAddress]);

  return (
    <>
			<div className='section-split'>
				<div className='left disable-scroll'>
					<FreeMintForm contractAddress={contractAddress}/>
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