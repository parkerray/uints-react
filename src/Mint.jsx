import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal, useWeb3Modal, Web3Button } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { fetchBalance } from '@wagmi/core'

import MintButton from './MintButton';

const chains = [goerli,mainnet];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "34db74586f81b3b0d0eb40e145dc4e6a" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

// Fetch balance
const balance = await fetchBalance({
  address: '0x06405928dB923de749A8AFB7801dA3Da1D34d341',
})


function Mint() {
	const { isOpen, open, close } = useWeb3Modal();

  return (
    <>
      <WagmiConfig client={wagmiClient}>
          <div className="section">
            <div className="container">
              <h1>Mint</h1>
							<p>balance is {balance.formatted}</p>
							<MintButton />
              <Web3Button />
							<button onClick={open}>
								{wagmiClient.data.account ? wagmiClient.data.account : "connect"}
							</button>
            </div>
          </div>
      </WagmiConfig>
      <Web3Modal
        projectId="34db74586f81b3b0d0eb40e145dc4e6a"
        ethereumClient={ethereumClient}
      />
    </>
  )
}

export default Mint;