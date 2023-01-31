import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import * as React from 'react';
import { useState } from 'react';

// Write to contract
export default function MintButton() {

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
    setQuantity(event.target.value);
  }

   return (
    <div>
      <input value={quantity} onChange={handleChange}></input>
      <button disabled={!write || isLoading} onClick={() => write()}>
        {isLoading ? 'Minting...' : `mint Ξ${(quantity * .003).toFixed(3)}`}
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