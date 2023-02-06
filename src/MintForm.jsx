import { 
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';
import { ethers, BigNumber } from 'ethers';

import { useState } from 'react';
import './MintForm.css';

export default function MintForm({contractAddress,cost}) {

  //define states
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(true);

  const { isConnected, address } = useAccount();

	const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
	  address: contractAddress,
		abi: [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "quantity",
            "type": "uint256"
          }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
    ],
		functionName: 'mint',
		args: [quantity],
    overrides: {
      from: address,
      value: BigNumber.from((quantity * cost).toString()),
    },
	})

  const { data, error, isError, write } = useContractWrite({
    ...config,
    onSuccess() {
      setShowForm(false);
    }
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleChange = (event) => {
    if (event.target.value > 0) {
      setQuantity(parseInt(event.target.value));
    } else {
      setQuantity('')
    }
  }

  const increaseQuantity = () => {
    if (quantity >= 0) {
      setQuantity(quantity + 1);
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const { open } = useWeb3Modal();

  const handleMintClick = () => {
    if (isConnected) {
      write();
    } else {
      open();
    }
  }

   return (
    <div className='form-wrapper'>
        {showForm && (
        <>
          <input 
            className='outlined-input large'
            value={quantity}
            onChange={handleChange}
            placeholder={'0'}
          ></input>
          <div className='flex'>
            <button className='outlined-input small' onClick={decreaseQuantity}>
              <img className='buttonSvg' src='../subtract.svg'></img>
            </button>
            <button className='outlined-input small' onClick={increaseQuantity}>
              <img className='buttonSvg' src='../add.svg'></img>
            </button>
        </div>
      </>
      )}
        <button 
          className='mint-button'
          disabled={isLoading || isError || isSuccess}
          onClick={handleMintClick}>
          {isLoading ? 'Minting...' : isSuccess ? 'Success!' : (isConnected ? `Mint Ξ${(quantity * .003).toFixed(3)}` : 'CONNECT')}
        </button>
      {isSuccess && (
        <div className='successMessage'>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>View tx on etherscan</a>
        </div>
      )}
      {isPrepareError || isError && (
        <div className='errorMessage'>
            <p>Error: {(prepareError || error)?.message}</p>
        </div>
      )}
    </div>
   )
}