import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: "IMT2ddHQRUnuzsikGrQ6gIVSB8kRQcwi",
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

export async function getTotalSupply(address) {
  const result = await alchemy.nft.getContractMetadata(address);
  return result.totalSupply;
}