"use client";

import { NFT } from '@/lib/types';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1646832744140-d66deb0d9648?q=80&w=1000&auto=format&fit=crop';

export default function NFTCard({ nft }: { nft: NFT }) {
  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="p-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={nft.image_url || DEFAULT_IMAGE}
            alt={nft.name || 'NFT Image'}
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{nft.name || 'Unnamed NFT'}</CardTitle>
        <CardDescription className="text-sm text-gray-400 mb-4">
          {nft.description?.slice(0, 100)}
          {nft.description?.length > 100 ? '...' : ''}
        </CardDescription>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="text-gray-400">Collection: </span>
            {nft.collection.name || 'Unknown Collection'}
          </p>
          <p className="text-sm">
            <span className="text-gray-400">Token ID: </span>
            {nft.token_id}
          </p>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() =>
              window.open(
                `https://opensea.io/assets/ethereum/${nft.contract.address}/${nft.token_id}`,
                '_blank'
              )
            }
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on OpenSea
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}