import Segments from './Segments';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';
import { getOwnedNfts } from '../web3api';

function Combine() {
	const contractAddress = '0x7C10C8816575e8Fdfb11463dD3811Cc794A1D407';
  const [sum, setSum] = useState(0);
  const [values, setValues] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [selected, setSelected] = useState([]);

  const { isConnected, address } = useAccount();

  const handleSelect = (token) => {
    setSelected(prevSelected => {
      if (prevSelected.includes(token)) {
        return prevSelected.filter(i => i !== token);
      } else {
        return [...prevSelected, token];
      }
    });
    setValues(prevValues => {
      if (prevValues.includes(token.rawMetadata.attributes[0].value)) {
        return prevValues.filter(i => i !== token.rawMetadata.attributes[0].value);
      } else {
        return [...prevValues, token.rawMetadata.attributes[0].value];
      }
    })
  };

  const getSum = (tokens) => {
    let sum = 0;
    for (let i = 0; i < tokens.length; i++) {
      sum += tokens[i].rawMetadata.attributes[0].value;
    }
    return sum;
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getOwnedNfts(address);
      setTokens(result.ownedNfts);
    }
    fetchData();
  }, []);

  return (
    <>
			<div className='section-split'>
				<div className='left'>
          {tokens.length > 0 ? (
          <div className='token-grid'>
          {tokens.map(token => (
            <div 
              className='token-card'
              key={token.tokenId}
              style={{ border: selected.includes(token) ? '1px solid #0F2FD8' : '1px solid white' }}
              onClick={() => handleSelect(token)}
            >
              {/* <img style={{width: '200px'}} src={token.media[0].raw}></img> */}
              <Segments value={token.rawMetadata.attributes[0].value} />
              <p>{token.title}</p>
            </div>
          ))}
          </div>) : <p>NO UINTS FOUND</p>}
				</div>
				<div className='right disable-scroll'>
					<div className='container disable-scroll'>
						<div className='counter-wrapper'>
							<div className='counter-card'>
								<Segments value={getSum(selected)} />
								<p className='counter-label'>Total if combined</p>
							</div>
						</div>
					</div>
				</div>
			</div>
    </>
  );
}

export default Combine;