'use client';

import { useState } from 'react';
import { BURN_ADDRESS, BURN_WALLET } from '../lib/solana';

export function HowToBurn() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(BURN_WALLET.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="window-98 window-98-info">
      <div className="window-titlebar">
        <span>📖 como-quemar-doggy.txt - Tutorial</span>
        <span>—  ▢  ✕</span>
      </div>
      <div className="window-content">
        
        {/* INTRO */}
        <div className="mb-6 text-center">
          <h3 className="text-meme-bold text-xl mb-2">
            🔥 Cómo Aparecer en el Dashboard
          </h3>
          <p className="text-meme text-sm text-gray-600 mb-3">
            Todo manual desde TU wallet. Para quemar, no conectas nada. Para reclamar badge (opcional), solo firmas un mensaje gratis.
          </p>
          
          {/* SEGURIDAD PROMINENTE */}
          <div className="bg-green-50 border-2 border-green-500 p-4 rounded inline-block">
            <p className="text-sm font-bold text-green-800 mb-2">
              🔒 <strong>PROCESO 100% SEGURO</strong>
            </p>
            <ul className="text-xs text-green-700 text-left space-y-1">
              <li>✅ <strong>Desde tu wallet</strong> - Tú controlas todo</li>
              <li>✅ <strong>Para quemar</strong> - No conectas wallet, solo envías</li>
              <li>✅ <strong>Para badge (opcional)</strong> - Solo firma mensaje, gratis</li>
              <li>✅ <strong>Verificable on-chain</strong> - Datos públicos</li>
            </ul>
          </div>
        </div>

        {/* DIRECCIÓN OFICIAL */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-lg border-2 border-fire mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-fire uppercase tracking-wide">
                ✅ Dirección Oficial DOGGY Burns
              </span>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded border border-gray-300 mb-3">
            <code className="text-xs font-mono break-all text-gray-800 block">
              {BURN_WALLET.toBase58()}
            </code>
          </div>
          
          <button
            onClick={copyAddress}
            className={`btn-win98 w-full py-2 transition-all ${
              copied ? 'btn-fire' : ''
            }`}
          >
            {copied ? '✓ ¡Copiado al portapapeles!' : '📋 Copiar Dirección'}
          </button>
          
          <div className="mt-3 text-xs text-gray-600">
            <p className="mb-1">
              <strong>⚠️ Importante:</strong> Los tokens enviados aquí son <strong>100% irrecuperables</strong>.
            </p>
            <a
              href={`https://solscan.io/account/${BURN_ADDRESS.toBase58()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fire hover:underline inline-flex items-center gap-1"
            >
              Verificar en Solscan ↗
            </a>
          </div>
        </div>

        {/* INSTRUCCIONES PASO A PASO */}
        <div className="mb-6">
          <h4 className="text-meme-bold text-lg mb-4">📱 Pasos para Quemar</h4>
          
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-fire">1.</span>
              </div>
              <div className="flex-1">
                <h5 className="text-meme-bold text-base mb-1">Abre tu Wallet</h5>
                <p className="text-sm text-gray-700">
                  Phantom, Solflare, Backpack, o cualquier wallet de Solana
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-fire">2.</span>
              </div>
              <div className="flex-1">
                <h5 className="text-meme-bold text-base mb-1">Selecciona DOGGY y haz clic en Enviar</h5>
                <p className="text-sm text-gray-700">
                  Encuentra DOGGY en tu lista de tokens y selecciona "Send"
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-fire">3.</span>
              </div>
              <div className="flex-1">
                <h5 className="text-meme-bold text-base mb-1">Pega la dirección de quemado</h5>
                <p className="text-sm text-gray-700">
                  Copia la dirección de arriba y pégala en el campo "To"
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-fire">4.</span>
              </div>
              <div className="flex-1">
                <h5 className="text-meme-bold text-base mb-1">Ingresa la cantidad</h5>
                <p className="text-sm text-gray-700">
                  Mínimo 10,000 DOGGY para aparecer en el leaderboard
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-fire">5.</span>
              </div>
              <div className="flex-1">
                <h5 className="text-meme-bold text-base mb-1">Confirma la transacción</h5>
                <p className="text-sm text-gray-700">
                  Revisa todo y confirma en tu wallet
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-fire">6.</span>
              </div>
              <div className="flex-1">
                <h5 className="text-meme-bold text-base mb-1">Reclama tu Badge 🎖️</h5>
                <p className="text-sm text-gray-700">
                  Firma un mensaje en tu wallet para recibir tu badge. <strong>Gratis, sin fees</strong>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <span className="text-2xl">✓</span>
              </div>
              <div className="flex-1">
                <h5 className="text-meme-bold mb-1">¡Listo! 🎉</h5>
                <p className="text-sm text-gray-600">
                  Aparecerás en el leaderboard en 30-60 segundos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NIVELES DE BURN LORDS */}
        <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-300 mb-6">
          <h4 className="text-meme-bold text-lg mb-3">🏆 Niveles de DoggyQuemadores</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-white rounded border border-orange-200">
              <div className="flex items-center gap-2">
                <span className="badge badge-bronce">🥉 BRONCE</span>
                <span className="text-sm text-gray-700">10,000 - 99,999 DOGGY</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-300">
              <div className="flex items-center gap-2">
                <span className="badge badge-plata">🥈 PLATA</span>
                <span className="text-sm text-gray-700">100,000 - 999,999 DOGGY</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-white rounded border border-yellow-400">
              <div className="flex items-center gap-2">
                <span className="badge badge-oro">🥇 ORO</span>
                <span className="text-sm text-gray-700">1,000,000+ DOGGY</span>
              </div>
            </div>
          </div>
        </div>

        {/* ADVERTENCIAS */}
        <div className="warning-box">
          <strong>⚠️ ADVERTENCIAS IMPORTANTES:</strong>
          <ul className="text-xs mt-2 space-y-1 ml-4">
            <li>• Verifica SIEMPRE la dirección antes de enviar</li>
            <li>• Los tokens quemados son <strong>100% irrecuperables</strong></li>
            <li>• Esto NO es consejo financiero</li>
            <li>• Probablemente esto es una mala decisión financiera</li>
            <li>• Pero hey, aparecerás en el leaderboard 🔥</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
