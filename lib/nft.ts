// NFT Minting con Metaplex
// TODO: Implementar cuando se definan las imágenes de NFTs

import type { WalletContextState } from '@solana/wallet-adapter-react';

export async function mintBurnerNFT(
  wallet: WalletContextState,
  level: 'chispa' | 'llamarada' | 'infierno',
  totalBurned: number
) {
  // TODO: Implementar NFT minting - usuario paga gas
  console.log('mintBurnerNFT - TODO: implementar', { level, totalBurned });
  throw new Error('NFT minting not implemented yet');
}
