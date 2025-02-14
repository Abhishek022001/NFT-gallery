"use client";

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import WalletConnect from '@/components/WalletConnect';
import NFTCard from '@/components/NFTCard';
import SearchBar from '@/components/SearchBar';
import { getNFTsByWallet } from '@/lib/moralis';
import { NFT } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const fetchNFTs = async (address: string) => {
    try {
      setLoading(true);
      setError(null);
      const fetchedNfts = await getNFTsByWallet(address);
      setNfts(fetchedNfts);
    } catch (err) {
      setError('Failed to fetch NFTs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            NFT Gallery
          </h1>
          <p className="text-gray-400 text-lg">
            Connect your wallet or search for any address to view NFTs
          </p>
        </div>

        <div className="space-y-8">
          <WalletConnect onConnect={fetchNFTs} />
          <SearchBar onSearch={fetchNFTs} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : nfts.length > 0 ? (
          <div
            ref={ref}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-1000 ${
              inView ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {nfts.map((nft) => (
              <NFTCard key={`${nft.contract.address}-${nft.token_id}`} nft={nft} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            No NFTs found. Connect your wallet or search for an address to view NFTs.
          </div>
        )}
      </div>
    </main>
  );
}