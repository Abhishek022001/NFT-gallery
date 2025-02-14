const MORALIS_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImY4NGNmNzYyLWEzNjQtNGNlYi04MDRlLWVmNWQ4MmU5NmFhMCIsIm9yZ0lkIjoiNDMxMzIwIiwidXNlcklkIjoiNDQzNjY5IiwidHlwZUlkIjoiNGE0NDg1YmItOGRlMS00YTczLTljMGYtNzJjMzM3ZDNmYjIxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mzk1MjgzMjEsImV4cCI6NDg5NTI4ODMyMX0.n1rBd8-vdAso_aHvOj2Yvzvmz_nJJKUbDZNIyZRtHQo';
const MORALIS_API_URL = 'https://deep-index.moralis.io/api/v2.2';

export async function getNFTsByWallet(walletAddress: string) {
  try {
    const response = await fetch(
      `${MORALIS_API_URL}/${walletAddress}/nft?chain=eth&format=decimal&media_items=true`,
      {
        headers: {
          'Accept': 'application/json',
          'X-API-Key': MORALIS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch NFTs');
    }

    const data = await response.json();
    
    // Transform Moralis response to match our NFT type
    return data.result.map((nft: any) => ({
      id: nft.token_id,
      name: nft.name || 'Unnamed NFT',
      description: nft.metadata?.description || '',
      image_url: nft.metadata?.image || nft.media?.original_media_url || '',
      collection: {
        name: nft.name || 'Unknown Collection',
        slug: nft.token_address,
      },
      contract: {
        address: nft.token_address,
      },
      token_id: nft.token_id,
      traits: nft.metadata?.attributes || [],
    }));
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw error;
  }
}