import { Metaplex, walletAdapterIdentity, bundlrStorage } from '@metaplex-foundation/js';
import { connection } from './solana';
import type { WalletContextState } from '@solana/wallet-adapter-react';

const NFT_METADATA = {
  bronce: {
    name: "The Burner - Bronce 🥉",
    symbol: "BURNER",
    description: "Certificado oficial de quema de tokens DOGGY - The Burner Bronce. Has contribuido a reducir el supply y fortalecer la comunidad.",
    image: "https://doggy-burner-tracker.vercel.app/nfts/bronce.png",
  },
  plata: {
    name: "The Burner - Plata 🥈",
    symbol: "BURNER",
    description: "Certificado oficial de quema de tokens DOGGY - The Burner Plata. Tu compromiso con el proyecto es ejemplar.",
    image: "https://doggy-burner-tracker.vercel.app/nfts/plata.png",
  },
  oro: {
    name: "The Burner - Oro 🥇",
    symbol: "BURNER",
    description: "Certificado oficial de quema de tokens DOGGY - The Burner Oro. Eres un verdadero diamond hands de la comunidad.",
    image: "https://doggy-burner-tracker.vercel.app/nfts/oro.png",
  },
};

/**
 * Mintea un NFT certificado de burn para el usuario
 * El usuario paga el gas (~0.01 SOL)
 */
export async function mintBurnerNFT(
  wallet: WalletContextState,
  level: 'bronce' | 'plata' | 'oro',
  totalBurned: number
) {
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error('Wallet no conectada correctamente');
  }

  const metaplex = Metaplex.make(connection)
    .use(walletAdapterIdentity(wallet))
    .use(bundlrStorage({
      address: 'https://devnet.bundlr.network',
      providerUrl: 'https://api.devnet.solana.com',
      timeout: 60000,
    }));

  const metadata = NFT_METADATA[level];
  
  // Crear metadata JSON completa
  const nftMetadata = {
    name: metadata.name,
    symbol: metadata.symbol,
    description: metadata.description,
    image: metadata.image,
    attributes: [
      {
        trait_type: "Nivel",
        value: level.charAt(0).toUpperCase() + level.slice(1),
      },
      {
        trait_type: "Total Quemado",
        value: totalBurned.toString(),
        display_type: "number",
      },
      {
        trait_type: "Fecha de Certificación",
        value: new Date().toISOString(),
      },
      {
        trait_type: "Proyecto",
        value: "DOGGY Burner Tracker",
      },
    ],
    properties: {
      category: "image",
      files: [
        {
          uri: metadata.image,
          type: "image/png",
        },
      ],
    },
  };

  console.log('[NFT] Subiendo metadata a Arweave...');
  const { uri } = await metaplex.nfts().uploadMetadata(nftMetadata);
  console.log('[NFT] Metadata URI:', uri);

  console.log('[NFT] Minteando NFT...');
  const { nft } = await metaplex.nfts().create({
    uri,
    name: metadata.name,
    symbol: metadata.symbol,
    sellerFeeBasisPoints: 0, // Sin royalties
    isMutable: false, // NFT inmutable
  });

  console.log('[NFT] NFT minteado exitosamente:', nft.address.toString());
  
  return {
    address: nft.address.toString(),
    name: nft.name,
    uri: nft.uri,
  };
}
