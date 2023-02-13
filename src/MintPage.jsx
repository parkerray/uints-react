// import MintForm from './MintForm';
// import Segments from './Segments';
// import { useState, useEffect } from 'react';
// import { useContractRead } from 'wagmi'

function MintPage() {
	// const [supply,setSupply] = useState('');
	// const [minutes,setMinutes] = useState('');
	// const contractAddress = '0x7C10C8816575e8Fdfb11463dD3811Cc794A1D407';

	// const { data } = useContractRead({
  //   address: contractAddress,
  //   abi: [{
	// 		"inputs": [],
	// 		"name": "getMinutesRemaining",
	// 		"outputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"stateMutability": "view",
	// 		"type": "function"
	// 	}],
  //   functionName: 'getMinutesRemaining',
	// 	onSuccess(data) {
	// 		setMinutes(parseInt(data._hex, 16));
	// 		if (parseInt(data._hex, 16) < 1) {
	// 			setMintOver(true);
	// 		}
	// 	}
  // })

	// const { mintData } = useContractRead({
	// 	address: contractAddress,
	// 	abi: [{
	// 		"inputs": [],
	// 		"name": "mintCount",
	// 		"outputs": [
	// 			{
	// 				"internalType": "uint256",
	// 				"name": "",
	// 				"type": "uint256"
	// 			}
	// 		],
	// 		"stateMutability": "view",
	// 		"type": "function"
	// 	},],
	// 	functionName: 'mintCount',
	// 	onSuccess(data) {
	// 		setSupply(parseInt(data._hex, 16));
	// 	}
	// })

	// useEffect(() => {
	// 	setInterval(() => {
	// 		setMinutes(parseInt(data._hex, 16));
	// 		setSupply(parseInt(mintData._hex, 16));
	// 	}, 10000);
  // }, []);

  return (
    <>
			<div className='section-split'>
				<div className='left disable-scroll flex-column'>
					
					{/* <MintForm contractAddress={contractAddress} cost={3000000000000000} />
					<a className='successMessage' href='/about'>Please read the about page in full before minting</a> */}
					
					<div className='flex-column'>
						<h1>Mint has ended</h1>
						<a href='https://opensea.io/collection/uints' style={{textAlign: 'center'}} className='button-outline'>Browse Opensea</a>
					</div>
				</div>
				<div className='right disable-scroll'>
					<div className='container disable-scroll'>
						<div className='counter-wrapper'>
							<p className='counter-label'>39,116 minted</p>
						</div>
					</div>
				</div>
			</div>
    </>
  );
}

export default MintPage;