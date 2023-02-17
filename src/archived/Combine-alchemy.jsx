import Segments from './Segments';
import TokenCard from './TokenCard';
import './Combine.css';
import { useState, useEffect } from 'react';
import { getOwnedNfts, getSingleNft, refresh } from '../web3api';
import { AnimatePresence, motion } from "framer-motion";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount, useContractRead } from 'wagmi';


function Combine() {
  const [tokens, setTokens] = useState([]);
  const [tokensPageKey, setTokensPageKey] = useState('');
  const [totalTokens, setTotalTokens] = useState(0);
  const [selected, setSelected] = useState([]);
  const [modalActive, setModalActive] = useState(true);
  const [revealToken, setRevealToken] = useState(false);
  const [newToken, setNewToken] = useState();

  const { isConnected, address } = useAccount();

  const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
    address: '0x6C6136B72EEBfd612519e8F1e60645FE5dB873Ec',
    abi: [{"inputs":[{"internalType":"uint256[]","name":"tokens","type":"uint256[]"}],"name":"combine","outputs":[],"stateMutability":"nonpayable","type":"function"}],
    functionName: 'combine',
    args: [selected.map(token => parseInt(token.tokenId))],
  })

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleSelect = (token) => {
    setSelected(prevSelected => {
      if (prevSelected.includes(token)) {
        return prevSelected.filter(i => i !== token);
      } else {
        return [...prevSelected, token];
      }
    });
  };

  const handleReveal = async () => {
    const result = await getSingleNft(selected[0].tokenId);
    setNewToken({
      "value": result[0].rawMetadata.attributes[0].value,
      "colors": getTokenColors(result[0])
    });
    console.log(result[0]);
    setRevealToken(true);
  }

  const getTokenColors = (token) => {
    const rgbString = token.rawMetadata.attributes[4].value;
    const valueString = rgbString.substring(4, rgbString.length - 1);
    const valueArray = valueString.split(",");
    return valueArray.map(value => parseInt(value, 10));
  }

  const closeModal = () => {
    setModalActive(false);
  }

  const getSum = (tokens) => {
    let sum = 0;
    for (let i = 0; i < tokens.length; i++) {
      sum += tokens[i].rawMetadata.attributes[0].value;
    }
    return sum;
  }

  const fetchData = async () => {
    const result = await getOwnedNfts(address,tokensPageKey);
    setTotalTokens(result.totalCount);
    if (result.totalCount > tokens.length) {
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
			<div className="combine-page-outer">
        <div className="combine-page-inner">
          <div className="token-select-wrapper">
            <div className="token-select-header">
              <div className='header-left'>
                <h1>Combine Uints</h1>
                <div>{selected.length < 1 ? `Choose a token to keep` : `Keeping ${selected[0].title}, now choose tokens to combine (burn)`}</div>
                {/* {error && (<p>{error.message}</p>)} */}
              </div>
              <div className='header-right'>
                <Segments value={getSum(selected)} colors={selected.length > 0 ? getTokenColors(selected[0]) : [255,255,255]} />
              </div>
            </div>
            { tokens.length > 0 ? (<div className="tokens-grid">
              {tokens.map(token => (
              <div
                key={token.tokenId}
                onClick={() => handleSelect(token)}
              >
                <TokenCard
                  image={token.rawMetadata.image}
                  label={token.title}
                  color={
                    selected[0] == token ? '#19D46F' :
                    selected.includes(token) ? '#FF4B4B' : '#FFFFFF80'
                  }
                />
              </div>))}
            </div>) :
            <p>Connect a wallet with UINTS to combine</p>}
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
                <div className="tray-label">Keep: {selected[0].title}</div>
                <div className="tray-label">Burn: {selected.length > 2 ? `${selected.length - 1} OTHER TOKENS` : `${selected.length - 1} OTHER TOKEN`}</div>
                <div className="tray-label">New Value: {getSum(selected)}</div>
              </div>
              <div className="tray-right">
                {/* <button
                  className="button-outline"
                  onClick={() => write?.()}
                >Combine</button> */}
              </div>
            </div>
          </motion.div>)}
        </AnimatePresence>
      </div>
      {(modalActive && isLoading || modalActive && isSuccess) && (<>
        <div className="modal-page">
          <div className="modal-inner">
            {/* <div className="modal-page-close" onClick={closeModal}>X</div>
            {isLoading && (<div>Loading...</div>)}
            {(isSuccess && !revealToken) && (<>
            <div>Success</div>
            <button className='button-outline' onClick={() => handleReveal()}>Reveal {selected[0].title}</button>
            </>)}
            {revealToken && (<>
              <Segments value={newToken.rawMetadata.attributes[0].value} color={getTokenColors(newToken)} />
            </>)} */}
          </div>
        </div>
      </>)}
    </>
  );
}

export default Combine;