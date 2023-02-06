import Nav from '../Nav'
import Footer from '../Footer'

import { modalConnectors, walletConnectProvider } from '@web3modal/ethereum';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';

const chains = [mainnet];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: 'e3ec552512d772dd5ccbbf77a0e02524' }),
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