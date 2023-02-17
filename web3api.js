import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  //apiKey: 'jGKT5FeK6siv-DGNf-Rk7S-aJhNqeX-R',
  apiKey: 'IMT2ddHQRUnuzsikGrQ6gIVSB8kRQcwi', //goerli
  //network: Network.ETH_MAINNET
  network: Network.ETH_GOERLI
};

const contracts = ['0x6C6136B72EEBfd612519e8F1e60645FE5dB873Ec']
//const contracts = ['0x7C10C8816575e8Fdfb11463dD3811Cc794A1D407']; //MAINNET

const alchemy = new Alchemy(settings);

export async function getTotalSupply(address) {
  const result = await alchemy.nft.getContractMetadata(address);
  return result.totalSupply;
}

export async function getOwnedNfts(address, pageKey) {
  const result = await alchemy.nft.getNftsForOwner(
    address,
    { contractAddresses: contracts,
    pageKey: pageKey, },
  );
  return result;
}

export async function refresh(tokenId) {
  const result = await alchemy.nft.refreshNftMetadata('0x6C6136B72EEBfd612519e8F1e60645FE5dB873Ec',tokenId);
  return result;
}

export async function getSingleNft(tokenId) {
  const result = await alchemy.nft.getNftMetadataBatch([
    {contractAddress: '0x6C6136B72EEBfd612519e8F1e60645FE5dB873Ec',
    tokenId: tokenId}
  ], {refreshCache: true});
  return result;
}

export async function refreshCollection() {
  const result = await alchemy.nft.refreshContract('0x6C6136B72EEBfd612519e8F1e60645FE5dB873Ec');
  return result;
}