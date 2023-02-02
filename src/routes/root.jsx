import Nav from '../Nav'
import Footer from '../Footer'

import { modalConnectors, walletConnectProvider } from '@web3modal/ethereum';
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


import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Nav />
        <Outlet />
        <Footer />
      </WagmiConfig>
    </>
  )
}