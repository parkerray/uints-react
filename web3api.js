import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: 'jGKT5FeK6siv-DGNf-Rk7S-aJhNqeX-R', //process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
};

const alchemy = new Alchemy(settings);

export async function getTotalSupply(address) {
  const result = await alchemy.nft.getContractMetadata(address);
  return result.totalSupply;
}

export async function getOwnedNfts(address) {
  const contracts = ['0x7C10C8816575e8Fdfb11463dD3811Cc794A1D407'];
  const result = await alchemy.nft.getNftsForOwner(
    address,
    {contractAddresses: contracts}
  );
  return result;
}