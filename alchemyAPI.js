import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

export async function getTotalSupply(address) {
  const result = await alchemy.nft.getContractMetadata(address);
  return result.totalSupply;
}