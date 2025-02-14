export interface NFT {
  id: string;
  name: string;
  description: string;
  image_url: string;
  collection: {
    name: string;
    slug: string;
  };
  contract: {
    address: string;
  };
  token_id: string;
  traits: Array<{
    trait_type: string;
    value: string;
  }>;
}

export interface WalletState {
  address: string | null;
  isConnecting: boolean;
  error: string | null;
}