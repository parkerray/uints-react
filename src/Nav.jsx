import './Nav.css'
import { Link } from 'react-router-dom'

import { Web3Modal, Web3Button } from '@web3modal/react';
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const chains = [mainnet];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: 'e3ec552512d772dd5ccbbf77a0e02524' }),
  publicProvider()
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'web3Modal', chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function Nav() {

  return (
    <>
      <nav className='nav'>
        <Link to ={`/`}>
          <img className='logo' src='/logo.svg' />
        </Link>
        <div className='nav-links'>
          <Link to={`/top`}>Top</Link>
          <Link to={`/about`}>About</Link>
          <Link to={`/combine`}>Combine</Link>
          <Web3Button icon='hide' label='CONNECT' />
        </div>
      </nav>
      <Web3Modal
        projectId='e3ec552512d772dd5ccbbf77a0e02524'
        ethereumClient={ethereumClient}
        themeMode={'dark'}
        themeColor={'blackWhite'}
        themeBackground={'themeColor'}
      />
    </>
  )
}