import './Nav.css'
import { Link } from 'react-router-dom'

import { Web3Modal, Web3Button } from '@web3modal/react';
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli, mainnet } from 'wagmi/chains';

const chains = [goerli,mainnet];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: '34db74586f81b3b0d0eb40e145dc4e6a' }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'web3Modal', chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

function Nav() {

  return (
    <>
      <nav className='nav'>
        <Link to ={`/`}>
          <img className='logo' src='/logo.svg' />
        </Link>
        <div className='nav-links'>
          <Link to={`/about`}>About</Link>
          <Link to={`/mint`}>Mint</Link>
          <Web3Button icon='hide' label='CONNECT' />
        </div>
      </nav>
      <Web3Modal
        projectId='34db74586f81b3b0d0eb40e145dc4e6a'
        ethereumClient={ethereumClient}
        themeMode={'dark'}
        themeColor={'blackWhite'}
        themeBackground={'themeColor'}
      />
    </>
  )
}

export default Nav