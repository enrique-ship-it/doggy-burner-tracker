// Solana connection y constantes

import { Connection, PublicKey } from '@solana/web3.js';

// Helius RPC
const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY!;
const RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

export const connection = new Connection(RPC_URL, 'confirmed');

// Constantes del proyecto
export const DOGGY_MINT = new PublicKey('BS7HxRitaY5ipGfbek1nmatWLbaS9yoWRSEQzCb3pump');
export const BURN_ADDRESS = new PublicKey('Burn111111111111111111111111111111111111111');
export const DEV_WALLET = new PublicKey('3CsLCkKNEC9UrsycKdqo9BEPkBazgLWs52iNZbqjvXaQ');

// Decimales del token DOGGY (ajustar si es diferente)
export const DOGGY_DECIMALS = 6;

// Helper para formatear números
export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString();
}

// Helper para truncar direcciones
export function truncateAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

// Helper para obtener nivel según cantidad quemada
export function getLevel(totalBurned: number): 'chispa' | 'llamarada' | 'infierno' {
  if (totalBurned >= 1_000_000) return 'infierno';
  if (totalBurned >= 100_000) return 'llamarada';
  return 'chispa';
}

// Helper para obtener emoji del nivel
export function getLevelEmoji(level: 'chispa' | 'llamarada' | 'infierno'): string {
  switch (level) {
    case 'infierno': return '🔥🔥🔥';
    case 'llamarada': return '🔥🔥';
    case 'chispa': return '🔥';
  }
}
