import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import * as React from 'react';
import { useState } from 'react';
import './MintForm.css'

export default function MintForm() {

  const [quantity, setQuantity] = useState(1);

	const { config } = usePrepareContractWrite({
		address: '0xde1a286b5A74F7Ee0f4BE07255Bab15a30a5aFCA',
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
		args: [quantity]
	 })
	 const { data, write } = useContractWrite(config);

   const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleChange = (event) => {
    console.log(event.target.value)
    if (event.target.value > 0) {
      setQuantity(parseInt(event.target.value));
    } else {
      setQuantity('')
    }
  }

  const increaseQuantity = () => {
    if (quantity >= 0 && quantity <= 49) {
      setQuantity(quantity + 1);
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const getMintText = (value) => {
    if (value > 0 && value <= 50) {
      return `mint Ξ${(quantity * .003).toFixed(3)}`;
    } else {
      return `qty must be 1-50`;
    }
  }

   return (
    <div className='quantityFormWrapper'>
      <div className='quantityForm'>
        <span className='label'>Max 50 tokens per transaction</span>
        <input className='box' value={quantity} onChange={handleChange}></input>
        <div className='incrementButtons'>
          <button className='box increment' onClick={decreaseQuantity}>
            <img className='buttonSvg' src='../subtract.svg'></img>
          </button>
          <button className='box increment' onClick={increaseQuantity}>
            <img className='buttonSvg' src='../add.svg'></img>
          </button>
        </div>
      </div>
      <button id='mint' disabled={!write || isLoading} onClick={() => write()}>
        {isLoading ? 'Minting...' : getMintText(quantity)}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>view tx on etherscan</a>
          </div>
        </div>
      )}
    </div>
   )
}