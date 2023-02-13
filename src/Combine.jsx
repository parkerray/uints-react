import Segments from './Segments';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { getOwnedNfts } from '../web3api';

function Combine() {
  const [tokens, setTokens] = useState([]);
  const [tokensPageKey, setTokensPageKey] = useState('');
  const [totalTokens, setTotalTokens] = useState(0);
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
  };

  const getSum = (tokens) => {
    let sum = 0;
    for (let i = 0; i < tokens.length; i++) {
      sum += tokens[i].rawMetadata.attributes[0].value;
    }
    return sum;
  }

  const selectAll = () => {
    setSelected(() => {
      let all = [];
      for (let i = 0; i < tokens.length; i++) {
        all.push(tokens[i]);
      }
      return all;
    })
  }

  const deselectAll = () => {
    setSelected([]);
  }

  const fetchData = async () => {
    const result = await getOwnedNfts(address,tokensPageKey);
    if (tokens.length > 0) {
      setTokens([...tokens, ...result.ownedNfts]);
    } else {
      setTokens(result.ownedNfts);
    }

    if (result.pageKey != '') {
      setTokensPageKey(result.pageKey);
    } else {
      setTokensPageKey('');
    }

    setTotalTokens(result.totalCount);
  }

  const loadMore = () => {
    console.log('fetching more...')
    fetchData();
  }
  

  useEffect(() => {
    fetchData();
  }, [isConnected, address]);

  return (
    <>
			<div className='section-split'>
				<div className={tokens.length > 0 ? 'left align-top' : 'left'}>
          {tokens.length > 0 ? (
            <div className='select-tokens-container'>
            {tokens.length != selected.length ? <p className='button-outline' onClick={selectAll}>SELECT ALL</p> :
            <p className='button-outline' onClick={deselectAll}>DESELECT ALL</p>}
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
          </div>
          </div>) : <p className='margin-10p'>CONNECT TO A WALLET WITH UINTS TO SEE A PREVIEW OF THE COMBINE FUNCTION.</p>}
          {totalTokens > tokens.length && <button onClick={loadMore} className='button-outline'>Load more</button>}
				</div>
				<div className='right disable-scroll'>
					<div className='container disable-scroll'>
						<div className='counter-wrapper'>
							<div className='counter-card'>
								<Segments value={(getSum(selected) > 9999) ? 9999 : getSum(selected)} />
								<p className='counter-label'>Sum of selected tokens</p>
                <p className='counter-label-sub'>Combining is not yet active</p>
							</div>
						</div>
					</div>
				</div>
			</div>
    </>
  );
}

export default Combine;