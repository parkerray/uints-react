import { 
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
  useContractRead,
} from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';

import { useState } from 'react';
import './MintForm.css';

export default function FreeMintForm({contractAddress,cost}) {

  //define states
  const [quantity, setQuantity] = useState(1);
  const [limit, setLimit] = useState(50);
  const [showForm, setShowForm] = useState(true);
  const [freeMints, setFreeMints] = useState(0);

  const { isConnected, address } = useAccount();

  //check for free mints
  {
    const { data } = useContractRead({
      address: contractAddress,
      functionName: 'freeMintBalance',
      abi: [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "addy",
              "type": "address"
            }
          ],
          "name": "freeMintBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
      ],
      args: [address],
      onSuccess(data) {
        const amt = parseInt(data._hex, 16);
        if (amt > 0) {
          setLimit(amt);
          setFreeMints(amt);
          console.log(`${address} has ${amt} free mints`)
        } else {
          setLimit(0);
          console.log(`${address} has 0 free mints`)
        }
      },
    })
  }

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
        "name": "freeMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ],
		functionName: 'freeMint',
		args: [quantity],
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
    if (quantity >= 0 && quantity < limit) {
      setQuantity(quantity + 1);
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const getMintText = (value) => {
    if (value <= limit) {
      return `Mint for free`;
    } else {
      return `limit is ${limit}`;
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
      {freeMints > 0 ? (
      <>
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
          {isLoading ? 'Minting...' : isSuccess ? 'Success!' : (isConnected ? getMintText(quantity) : 'CONNECT')}
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
      </>):null}
      {freeMints == 0 && (
        <a className='successMessage' href='/mint'>You have no free mints</a>
      )}
    </div>
   )
}