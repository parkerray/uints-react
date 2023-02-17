import Segments from './Segments';
import TokenCard from './TokenCard';
import CombineClock from './CombineClock';
import './Combine.css';
import { useState, useEffect } from 'react';
import { getOwnedNfts, refresh, getNftMetadata } from '../moralis';
import { AnimatePresence, motion } from "framer-motion";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount } from 'wagmi';


export default function CombineV2() {
  const [tokens, setTokens] = useState([]);
  const [tokensPageKey, setTokensPageKey] = useState('');
  const [totalTokens, setTotalTokens] = useState(0);
  const [selected, setSelected] = useState([]);
  const [revealToken, setRevealToken] = useState(false);
  const [newToken, setNewToken] = useState();
  const [combineActive, setCombineActive] = useState(false);

  const { isConnected, address } = useAccount();

  const taglines = [
    'Can I get your number?',
    'That was calculated',
    'Way to make it count',
    'You summed some sums',
    'Want some ice for that burn?'
  ]

  const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
    address: '0x7C10C8816575e8Fdfb11463dD3811Cc794A1D407',
    abi: [{"inputs":[{"internalType":"uint256[]","name":"tokens","type":"uint256[]"}],"name":"combine","outputs":[],"stateMutability":"nonpayable","type":"function"}],
    functionName: 'combine',
    args: [selected.map(token => parseInt(token.token_id))],
  })

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      refresh(selected[0].token_id);
    }
  })

  const handleSelect = (token) => {
    if (getSum(selected) + token.normalized_metadata.attributes[0].value <= 9999) {
      setSelected(prevSelected => {
        if (prevSelected.includes(token)) {
          return prevSelected.filter(i => i !== token);
        } else {
          return [...prevSelected, token];
        }
      });
    } else {
      console.log(`Cannot combine to a number greater than 9999.`)
    }
  };

  const handleReveal = async () => {
    const tempToken = await getNftMetadata(selected[0].token_id);
    setNewToken({
      "color": tempToken.normalized_metadata.attributes[4].value,
      "number": tempToken.normalized_metadata.attributes[0].value
    });
  }

  useEffect(() => {
    if (newToken) {
      setRevealToken(true);
    }
  }, [newToken]);

  const getTokenColors = (rgbString) => {
    const valueString = rgbString.substring(4, rgbString.length - 1);
    const valueArray = valueString.split(",");
    return valueArray.map(value => parseInt(value, 10));
  }

  const closeModal = () => {
    window.location.reload();
  }

  const getSum = (tokens) => {
    let sum = 0;
    for (let i = 0; i < tokens.length; i++) {
      sum += tokens[i].normalized_metadata.attributes[0].value;
    }
    return sum;
  }

  const fetchData = async () => {
    const result = await getOwnedNfts(address,tokensPageKey);
    setTotalTokens(result.total);
    if (result.total > tokens.length) {
      if (tokens.length > 0) {
        setTokens([...tokens, ...result.result]);
      } else {
        setTokens(result.result);
      }

      if (result.cursor != '') {
        setTokensPageKey(result.cursor);
      } else {
        setTokensPageKey('');
      }
    }
  }

  const loadMore = () => {
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, [isConnected, address]);

  return (
    <>
    {combineActive ? (
      <>
        <div className="combine-page-outer">
        <div className="combine-page-inner">
          <div className="token-select-wrapper">
            <div className="token-select-header">
              <div className='header-left'>
                <h1>Combine Uints</h1>
                <div>{selected.length < 1 ? `Choose a token to keep` : `Keeping ${selected[0].normalized_metadata.name}, now choose tokens to combine (burn)`}</div>
              </div>
              <div className='header-right mobile-hide'>
                <Segments value={getSum(selected)} colors={selected.length > 0 ? getTokenColors(selected[0].normalized_metadata.attributes[4].value) : [255,255,255]} />
              </div>
            </div>
            {tokens.length > 0 && (<div className="tokens-grid">
              {tokens.map(token => (
              <div
                key={token.token_id}
                onClick={() => handleSelect(token)}
              >
                <TokenCard
                  image={token.normalized_metadata.image}
                  label={token.normalized_metadata.name}
                  color={
                    selected[0] == token ? '#19D46F' :
                    selected.includes(token) ? '#FF4B4B' : '#FFFFFF80'
                  }
                />
              </div>))}
            </div>)}
            {(tokens.length == 0 && isConnected) || (!isConnected) && (<p>Connect a wallet with UINTS to combine</p>)}
            <div className='load-more'>
              {(totalTokens > tokens.length && tokens.length != 0) && (<button onClick={loadMore} className='button-outline'>Load more</button>)}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {selected.length > 1 && (<motion.div
            className='combine-tray'
            initial={{ transform: 'translateY(130px)' }}
            animate={{ transform: 'translateY(0px)' }}
            exit={{ transform: 'translateY(130px)' }}
            transition={{ duration: .25 }}
          >
            <div className="combine-tray-inner">
              <div className="tray-left">
                <div className="tray-label">Keep: {selected[0].normalized_metadata.name}</div>
                <div className="tray-label">Burn: {selected.length > 2 ? `${selected.length - 1} OTHER TOKENS` : `${selected.length - 1} OTHER TOKEN`}</div>
                <div className="tray-label">New Value: {getSum(selected)}</div>
                {selected[0].normalized_metadata.attributes[3].value == "White" && (
                  <div className='tray-label'>Color: Random</div>
                )}
                {selected[0].normalized_metadata.attributes[3].value != "White" && (
                  <div
                    className='tray-label color'
                    style={{color: selected[0].normalized_metadata.attributes[4].value}}
                  >Color: {selected[0].normalized_metadata.attributes[4].value}</div>
                )}
              </div>
              <div className="tray-right">
                <button
                  className="button-outline no-margin"
                  onClick={() => write?.()}
                >Combine</button>
              </div>
            </div>
          </motion.div>)}
        </AnimatePresence>
      </div>
      {(isLoading || isSuccess) && (<>
        <div className="modal-page">
          <div className="modal-inner">
            {isLoading && (
              <div className='loading-wrapper'>
                <img className='spinner' src='/public/loading-ordered.svg' />
                <div>Combining your UINTS...</div>
              </div>
            )}
            {(isSuccess && !revealToken) && (
              <>
                <h2>Uints combined!</h2>
                <button className='button-outline' onClick={() => handleReveal()}>View {selected[0].normalized_metadata.name}</button>
              </>)}
            {revealToken && (<div className='revealed-wrapper'>
              <Segments value={newToken.number} colors={getTokenColors(newToken.color)} />
              <div className='tagline'>{taglines[Math.floor(Math.random() * taglines.length)]}</div>
              <button className='button-outline' onClick={closeModal}>Back to combine page</button>
            </div>)}
          </div>
        </div>
      </>)}
      </>
    ) : <CombineClock />}
    </>
  );
}