// Constantes del proyecto centralizadas
// Siguiendo principio DRY (Don't Repeat Yourself)

// Polling intervals
export const POLL_INTERVAL = 30_000; // 30 segundos
export const POLL_INTERVAL_SLOW = 60_000; // 1 minuto

// UI delays
export const COPY_FEEDBACK_DELAY = 2_000; // 2 segundos
export const SUCCESS_MESSAGE_DELAY = 5_000; // 5 segundos

// Burn levels (en DOGGY tokens)
export const BURN_LEVEL_CHISPA_MIN = 10_000;
export const BURN_LEVEL_LLAMARADA_MIN = 100_000;
export const BURN_LEVEL_INFIERNO_MIN = 1_000_000;

// Token decimals
export const DOGGY_DECIMALS = 6;

// API endpoints (relativas)
export const API_ENDPOINTS = {
  BURNS: '/api/burns',
  SYNC: '/api/sync',
} as const;

// Links externos
export const SOLSCAN_BASE_URL = 'https://solscan.io';
export const SOLSCAN_TX = (signature: string) => `${SOLSCAN_BASE_URL}/tx/${signature}`;
export const SOLSCAN_ACCOUNT = (address: string) => `${SOLSCAN_BASE_URL}/account/${address}`;
