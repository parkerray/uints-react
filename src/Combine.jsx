import Segments from './Segments';
import TokenCard from './TokenCard';
import './Combine.css';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { getOwnedNfts } from '../web3api';

function Combine() {
  const [tokens, setTokens] = useState([]);
  const [tokensPageKey, setTokensPageKey] = useState('');
  const [totalTokens, setTotalTokens] = useState(0);
  const [keepToken, setKeepToken] = useState([]);
  const [burnTokens, setBurnTokens] = useState([]);
  const [selected, setSelected] = useState([]);

  const { isConnected, address } = useAccount();

  const handleSelect = (token) => {
    console.log(token)
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

  const getBurnList = (tokens) => {
    let result = '';
    for (let i = 1; i < tokens.length + 1; i++) {
      if (i == 0) {
        result = tokens[i].tokenId;
      } else {
        result = result + ', ' + tokens[i].tokenId;
      }
    }
    return result;
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
			<div className="combine-page-outer">
        <div className="combine-page-inner">
          <div className="token-select-wrapper">
            <div className="token-select-header">
              <div className='header-left'>
                <h1>Combine Uints</h1>
                <div>Select the token to keep, then the tokens to burn</div>
              </div>
              <div className='header-right'>
                <Segments value={getSum(selected)} />
              </div>
            </div>
            <div className="tokens-grid">
              {tokens.map(token => (
              <div
                key={token.tokenId}
                onClick={() => handleSelect(token)}
              >
                <TokenCard
                  image={token.rawMetadata.image}
                  label={token.title}
                  color={'#FFFFFF'}
                />
              </div>))}
            </div>
          </div>
        </div>
        <div className="combine-tray">
          <div className="combine-tray-inner">
            <div className="tray-left">
              <div className="tray-label">Keep: {selected.length > 0 ? selected[0].title : ''}</div>
              <div className="tray-label">Burn: {selected.length > 1 ? `${selected.length - 1} OTHER TOKENS` : ''}</div>
              <div className="tray-label">New Value: {selected.length > 1 ? getSum(selected) : ''}</div>
            </div>
            <div className="tray-right">
              <a href="#" className="button-outline">Combine</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Combine;