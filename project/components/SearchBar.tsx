"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchBar({
  onSearch,
}: {
  onSearch: (address: string) => void;
}) {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      onSearch(address.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 w-full max-w-xl mx-auto"
    >
      <Input
        type="text"
        placeholder="Enter wallet address..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="flex-1 bg-transparent border-gray-700 text-white placeholder-gray-400"
      />
      <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>
    </form>
  );
}