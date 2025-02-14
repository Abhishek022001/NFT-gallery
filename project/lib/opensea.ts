const OPENSEA_API_KEY = process.env.NEXT_PUBLIC_OPENSEA_API_KEY || '';
const OPENSEA_API_URL = 'https://api.opensea.io/api/v2';

export async function getNFTsByWallet(walletAddress: string) {
  try {
    const response = await fetch(
      `${OPENSEA_API_URL}/chain/ethereum/account/${walletAddress}/nfts`,
      {
        headers: {
          'X-API-KEY': OPENSEA_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch NFTs');
    }

    const data = await response.json();
    return data.nfts;
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw error;
  }
}