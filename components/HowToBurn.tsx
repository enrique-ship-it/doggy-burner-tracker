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
    <div className="how-to-section">
      <div className="window-titlebar" style={{background: 'linear-gradient(90deg, var(--fire) 0%, #ff8c42 100%)', marginBottom: '24px', borderRadius: '8px 8px 0 0'}}>
        <span style={{color: 'white'}}>🔥 CÓMO COMPETIR</span>
        <span style={{color: 'white'}}>—  ▢  ✕</span>
      </div>
      
      <div className="how-to-content">
        
        {/* INTRO */}
        <div className="text-center mb-8">
          <h3 className="how-to-title mb-3">
            ⏱️ En 2 minutos estás dentro
          </h3>
          <p className="text-meme text-gray-600">
            Es simple. Sin conectar wallet. Tú tienes el control.
          </p>
        </div>

        {/* 3 PASOS VISUALES */}
        <div className="steps-grid mb-8">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">👛</div>
            <h4 className="step-title">Abre tu Wallet</h4>
            <p className="step-description">
              Phantom, Solflare, Backpack o cualquier wallet de Solana
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">🔥</div>
            <h4 className="step-title">Envía DOGGY</h4>
            <p className="step-description">
              Mínimo 10,000 DOGGY a la dirección oficial de quemado
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">🎖️</div>
            <h4 className="step-title">Reclama Medalla</h4>
            <p className="step-description">
              Gratis, sin fees. Solo firmas un mensaje para verificar
            </p>
          </div>
        </div>

        {/* DIRECCIÓN OFICIAL CON MÁS PROMINENCIA */}
        <div className="burn-address-mega mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-lg font-bold text-fire">
              ✅ DIRECCIÓN OFICIAL
            </span>
          </div>
          
          <div className="address-display mb-4">
            <code className="text-sm md:text-base font-mono break-all">
              {BURN_WALLET.toBase58()}
            </code>
          </div>
          
          <button
            onClick={copyAddress}
            className={`btn-copy-mega ${copied ? 'copied' : ''}`}
          >
            {copied ? '✓ ¡COPIADO!' : '📋 COPIAR DIRECCIÓN'}
          </button>
          
          <div className="mt-4 text-center">
            <a
              href={`https://solscan.io/account/${BURN_ADDRESS.toBase58()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="verify-link"
            >
              🔍 Verificar en Solscan ↗
            </a>
          </div>
        </div>

        {/* NIVELES CON BENEFICIOS */}
        <div className="tiers-section mb-8">
          <h4 className="tiers-title mb-4">🏆 Niveles de Quemadores</h4>
          
          <div className="tiers-grid">
            <div className="tier-card tier-bronce">
              <div className="tier-badge">🥉 BRONCE</div>
              <div className="tier-amount">10K - 99K DOGGY</div>
              <div className="tier-benefits">
                <span>✓ Badge exclusivo</span>
                <span>✓ En el ranking</span>
              </div>
            </div>
            
            <div className="tier-card tier-plata">
              <div className="tier-badge-container">
                <div className="tier-badge">🥈 PLATA</div>
                <span className="most-popular">Más popular</span>
              </div>
              <div className="tier-amount">100K - 999K DOGGY</div>
              <div className="tier-benefits">
                <span>✓ Badge premium</span>
                <span>✓ Beneficios futuros</span>
                <span>✓ Acceso VIP</span>
              </div>
            </div>
            
            <div className="tier-card tier-oro">
              <div className="tier-badge">🥇 ORO</div>
              <div className="tier-amount">1M+ DOGGY</div>
              <div className="tier-benefits">
                <span>✓ Badge legendario</span>
                <span>✓ Máximos beneficios</span>
                <span>✓ Whitelist prioritaria</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEGURIDAD */}
        <div className="security-mega mb-6">
          <div className="security-title">🔒 100% SEGURO</div>
          <div className="security-checks">
            <span>✓ Desde tu wallet</span>
            <span>✓ Tú tienes control</span>
            <span>✓ Datos públicos on-chain</span>
            <span>✓ Sin firma de transacciones</span>
          </div>
        </div>

        {/* ADVERTENCIA */}
        <div className="warning-mega">
          <strong>⚠️ IMPORTANTE:</strong> Los tokens enviados son irrecuperables. Esto NO es consejo financiero. Probablemente es una mala decisión... pero hey, estarás en el ranking 🔥
        </div>

      </div>
    </div>
  );
}
