'use client';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  SolflareWalletAdapter,
  PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';

export function SolanaProvider({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Mainnet;
  
  // Helius RPC for better performance
  const endpoint = useMemo(() => {
    const heliusKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
    if (heliusKey) {
      return `https://mainnet.helius-rpc.com/?api-key=${heliusKey}`;
    }
    return clusterApiUrl(network);
  }, [network]);

  // Wallets - SOLFLARE PRIMERO (menos warnings)
  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),  // ✅ Recomendado - menos warnings
      new PhantomWalletAdapter(),   // Phantom como alternativa
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
