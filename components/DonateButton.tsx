'use client';

import { useState } from 'react';
import { DEV_WALLET } from '../lib/solana';
import { COPY_FEEDBACK_DELAY } from '../lib/constants';

export function DonateButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(DEV_WALLET.toBase58());
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_FEEDBACK_DELAY);
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Post-it style */}
      <div 
        className="bg-yellow-100 border-t-4 border-yellow-400 rounded-sm p-5 shadow-lg relative"
        style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          transform: 'rotate(-0.5deg)'
        }}
      >
        {/* Shadow effect for depth */}
        <div className="absolute -bottom-1 -right-1 w-full h-full bg-yellow-200/30 rounded-sm -z-10" 
             style={{ transform: 'rotate(1deg)' }} 
        />
        
        <div className="relative">
          <h3 className="text-base font-bold text-yellow-900 mb-2 font-handwriting">
            💎 Apoyar al Dev
          </h3>
          <p className="text-sm text-yellow-800 mb-3">
            Donaciones en DOGGY
          </p>
          <div className="bg-yellow-50 border border-yellow-300 rounded px-2 py-2 mb-3">
            <code className="text-xs text-yellow-900 break-all block font-mono">
              {DEV_WALLET.toBase58().slice(0, 16)}...{DEV_WALLET.toBase58().slice(-6)}
            </code>
          </div>
          <button
            onClick={handleCopy}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold px-4 py-2 rounded shadow-sm transition-all hover:shadow-md active:shadow-none"
          >
            {copied ? '✓ Copiado!' : '📋 Copiar Wallet'}
          </button>
          <p className="text-xs text-yellow-700 mt-3 text-center italic">
            100% opcional
          </p>
        </div>
      </div>
    </div>
  );
}
