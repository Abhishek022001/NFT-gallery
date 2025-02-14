"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { WalletState } from '@/lib/types';
import { Wallet } from 'lucide-react';

export default function WalletConnect({
  onConnect,
}: {
  onConnect: (address: string) => void;
}) {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnecting: false,
    error: null,
  });

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setWalletState(prev => ({
        ...prev,
        error: 'Please install MetaMask to connect your wallet',
      }));
      return;
    }

    try {
      setWalletState(prev => ({ ...prev, isConnecting: true, error: null }));
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const address = accounts[0];
      setWalletState(prev => ({
        ...prev,
        address,
        isConnecting: false,
      }));
      onConnect(address);
    } catch (error) {
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
        error: 'Failed to connect wallet',
      }));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={connectWallet}
        disabled={walletState.isConnecting}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2"
      >
        <Wallet className="w-5 h-5" />
        {walletState.isConnecting
          ? 'Connecting...'
          : walletState.address
          ? `Connected: ${walletState.address.slice(0, 6)}...${walletState.address.slice(-4)}`
          : 'Connect Wallet'}
      </Button>
      {walletState.error && (
        <p className="text-red-500 text-sm">{walletState.error}</p>
      )}
    </div>
  );
}