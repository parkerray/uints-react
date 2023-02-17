const apiKey = process.env.MORALIS_KEY;

export async function getOwnedNfts(address,pageKey) {
  let url = '';
  if (pageKey == '') {
    url = `https://deep-index.moralis.io/api/v2/${address}/nft?chain=goerli&format=decimal&disable_total=false&token_addresses%5B0%5D=0x6C6136B72EEBfd612519e8F1e60645FE5dB873Ec&normalizeMetadata=true`;
  } else {
    url = `https://deep-index.moralis.io/api/v2/${address}/nft?chain=goerli&format=decimal&disable_total=false&token_addresses%5B0%5D=0x6C6136B72EEBfd612519e8F1e60645FE5dB873Ec&cursor=${pageKey}&normalizeMetadata=true`;
  }

  return fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'X-API-Key': apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

export async function refresh(tokenId) {
  const url = `https://deep-index.moralis.io/api/v2/nft/0x6C6136B72EEBfd612519e8F1e60645FE5dB873Ec/${tokenId}/metadata/resync?chain=goerli&flag=uri&mode=sync`
  return fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'X-API-Key': apiKey
    }
  })
  .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getNftMetadata(tokenId) {
  const url = `https://deep-index.moralis.io/api/v2/nft/0x6C6136B72EEBfd612519e8F1e60645FE5dB873Ec/${tokenId}?chain=goerli&format=decimal&normalizeMetadata=true`
  return fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'X-API-Key': apiKey
    }
  })
  .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}
