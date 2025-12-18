// NFT Minting con Metaplex
// TODO: Implementar en Sprint 1

import type { WalletContextState } from '@solana/wallet-adapter-react';

export async function mintBurnerNFT(
  wallet: WalletContextState,
  level: 'chispa' | 'llamarada' | 'infierno',
  totalBurned: number
) {
  // TODO: Implementar en Sprint 1
  console.log('mintBurnerNFT - TODO: implementar', { level, totalBurned });
  throw new Error('NFT minting not implemented yet');
}
