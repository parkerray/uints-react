import { useContractRead } from 'wagmi'
import { useState, useEffect } from "react";

export default function CombineConfirm({selectedTokens}) {
  const [confirmedTokens, setConfirmedTokens] = useState([]);

  const tokenURI = useContractRead({
    address: '0x6C6136B72EEBfd612519e8F1e60645FE5dB873Ec',
    abi: `[{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]`,
    functionName: 'tokenURI',
  })

  async function getTokenURIs() {
    const tokenURIs = [];

    for (const token of selectedTokens) {
      const id = token.tokenId;
      const uri = await tokenURI.fn([id]);
      tokenURIs.push(uri);
    }

    setConfirmedTokens(tokenURIs);
  }

  return (
    <div>
      <button onClick={getTokenURIs}>Get Token URIs</button>
      {/* {tokens.map((uri) => (
        <div>{uri}</div>
      ))} */}
    </div>
  );
}
