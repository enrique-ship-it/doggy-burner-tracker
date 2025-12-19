// SERVER-ONLY: Solana connection con API key protegida
// NO importar este archivo desde componentes de cliente

import { Connection } from '@solana/web3.js';

// Esta variable NO tiene NEXT_PUBLIC_ = solo accesible server-side
const HELIUS_API_KEY = process.env.HELIUS_API_KEY;
const SOLANA_NETWORK = process.env.SOLANA_NETWORK || 'mainnet-beta';

if (!HELIUS_API_KEY) {
  throw new Error('HELIUS_API_KEY no está configurada');
}

// Connection para server-side API routes
export const serverConnection = new Connection(
  `https://${SOLANA_NETWORK}.helius-rpc.com/?api-key=${HELIUS_API_KEY}`,
  'confirmed'
);

export function getServerConnection(): Connection {
  return serverConnection;
}
