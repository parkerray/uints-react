export async function getOwnedNfts(address,pageKey) {
  let url = '';
  if (pageKey == '') {
    url = `https://deep-index.moralis.io/api/v2/${address}/nft?chain=eth&format=decimal&disable_total=false&token_addresses%5B0%5D=0x7C10C8816575e8Fdfb11463dD3811Cc794A1D407&normalizeMetadata=true`;
  } else {
    url = `https://deep-index.moralis.io/api/v2/${address}/nft?chain=eth&format=decimal&disable_total=false&token_addresses%5B0%5D=0x7C10C8816575e8Fdfb11463dD3811Cc794A1D407&cursor=${pageKey}&normalizeMetadata=true`;
  }

  return fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'X-API-Key': process.env.VITE_MORALIS_KEY
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
  const url = `https://deep-index.moralis.io/api/v2/nft/0x7C10C8816575e8Fdfb11463dD3811Cc794A1D407/${tokenId}/metadata/resync?chain=eth&flag=uri&mode=sync`
  return fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'X-API-Key': process.env.VITE_MORALIS_KEY
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
  const url = `https://deep-index.moralis.io/api/v2/nft/0x7C10C8816575e8Fdfb11463dD3811Cc794A1D407/${tokenId}?chain=eth&format=decimal&normalizeMetadata=true`
  return fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'X-API-Key': process.env.VITE_MORALIS_KEY
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
