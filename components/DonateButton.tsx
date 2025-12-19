'use client';

import { useState } from 'react';
import { DEV_WALLET } from '../lib/solana';
import { COPY_FEEDBACK_DELAY } from '../lib/constants';
import { trackEvent } from '../lib/analytics';

export function DonateButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(DEV_WALLET.toBase58());
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_FEEDBACK_DELAY);
    
    // Track donación intent
    trackEvent('donate_wallet_copied');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="window-98">
        <div className="window-titlebar">
          <span>💎 apoyar-dev.exe</span>
          <span>—  ▢  ✕</span>
        </div>
        <div className="window-content text-center">
          <p className="text-meme-bold text-base mb-2">
            Apoyar al Dev
          </p>
          <p className="text-meme text-sm mb-4 text-gray-700">
            Donaciones en DOGGY <span className="text-xs text-gray-500">(100% opcional)</span>
          </p>
          <div className="bg-gray-100 border-2 border-gray-300 rounded px-3 py-2 mb-4">
            <code className="code-address block text-xs">
              {DEV_WALLET.toBase58().slice(0, 12)}...{DEV_WALLET.toBase58().slice(-8)}
            </code>
          </div>
          <button
            onClick={handleCopy}
            className="btn-win98 btn-gold w-full"
          >
            {copied ? '✓ Copiado al portapapeles!' : '📋 Copiar Wallet'}
          </button>
          <p className="text-xs text-gray-600 mt-4">
            💡 Cada donación ayuda a mantener el tracker funcionando
          </p>
        </div>
      </div>
    </div>
  );
}
