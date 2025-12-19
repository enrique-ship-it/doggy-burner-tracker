/**
 * Analytics Helper
 * 
 * Trackea eventos importantes en Umami y Vercel Analytics
 */

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
    };
    va?: {
      track: (eventName: string, properties?: Record<string, any>) => void;
    };
  }
}

export type AnalyticsEvent = 
  | 'wallet_connected'
  | 'burn_initiated'
  | 'burn_completed'
  | 'nft_mint_initiated'
  | 'nft_mint_completed'
  | 'wallet_lookup'
  | 'donate_wallet_copied'
  | 'burn_address_copied';

interface EventProperties {
  amount?: number;
  level?: string;
  wallet?: string;
  [key: string]: any;
}

/**
 * Trackear evento en Umami y Vercel Analytics
 */
export function trackEvent(
  eventName: AnalyticsEvent,
  properties?: EventProperties
) {
  // Solo trackea en producción (no en localhost)
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Analytics Debug]', eventName, properties);
    return;
  }

  // Umami Analytics
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, properties);
  }

  // Vercel Analytics (si está habilitado)
  if (typeof window !== 'undefined' && window.va) {
    window.va.track(eventName, properties);
  }
}

/**
 * Trackear página vista (Umami lo hace automáticamente)
 */
export function trackPageView(url: string) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Analytics Debug] Pageview:', url);
  }
}

/**
 * Ejemplos de uso:
 * 
 * trackEvent('wallet_connected', { wallet: publicKey.toBase58() });
 * trackEvent('burn_completed', { amount: 10000 });
 * trackEvent('nft_mint_completed', { level: 'infierno' });
 */
