import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: "IMT2ddHQRUnuzsikGrQ6gIVSB8kRQcwi",
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

export async function getTotalSupply() {
  return alchemy.nft.getContractMetadata('0xde1a286b5A74F7Ee0f4BE07255Bab15a30a5aFCA')
}