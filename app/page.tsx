'use client';

import Image from 'next/image';
import { BurnLeaderboard } from '@/components/BurnLeaderboard';
import { BurnStats } from '@/components/BurnStats';
import { WalletLookup } from '@/components/WalletLookup';
import { RecentBurns } from '@/components/RecentBurns';
import { HowToBurn } from '@/components/HowToBurn';
import { DonateButton } from '@/components/DonateButton';
import { ClaimBadge } from '@/components/ClaimBadge';

export default function Home() {
  return (
    <div className="bg-burning-money">
      <div className="bg-overlay">

        {/* MAIN CONTENT */}
        <main className="max-w-6xl mx-auto px-4 py-12">
          
          {/* HERO MEJORADO */}
          <div className="text-center mb-12">
            <Image 
              src="/doggy.png" 
              alt="Doggy Bimsness" 
              width={180} 
              height={180}
              className="doggy-mascot-lg mx-auto mb-4"
            />
            <h1 className="title-meme text-4xl md:text-5xl mb-3">
              <span className="fire-emoji">🔥</span> EL RANKING DE LOS QUE SE ATREVEN <span className="fire-emoji">🔥</span>
            </h1>
            <p className="subtitle-meme-enhanced text-xl md:text-2xl mb-6">
              ¿Cuántos DOGGY te atreves a quemar?
            </p>
            
            <p className="text-meme text-lg mb-6 text-gray-700">
              Compite, sube al top, y recibe tu medalla de honor 🏆
            </p>

            {/* Microcopy con stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm font-medium text-gray-600">
              <span>💎 +12M DOGGY quemados</span>
              <span>🔥 157 competidores</span>
              <span>⚡ Actualización en tiempo real</span>
            </div>

            {/* BENEFICIOS CON ICONOS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
              <div className="benefit-card">
                <span className="text-4xl mb-3 block">🏆</span>
                <h3 className="benefit-title">Entra al Top</h3>
                <p className="benefit-text">Compite con la comunidad y escala posiciones</p>
              </div>
              
              <div className="benefit-card">
                <span className="text-4xl mb-3 block">🎖️</span>
                <h3 className="benefit-title">Medalla Exclusiva</h3>
                <p className="benefit-text">Demuestra tu lealtad con tu badge personalizado</p>
              </div>
              
              <div className="benefit-card">
                <span className="text-4xl mb-3 block">💎</span>
                <h3 className="benefit-title">Recompensas Futuras</h3>
                <p className="benefit-text">Acceso prioritario a drops y beneficios</p>
              </div>
            </div>

            {/* SEGURIDAD DESTACADA HERO */}
            <div className="security-badge-hero max-w-2xl mx-auto mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl">🔒</span>
                <div className="text-left">
                  <h3 className="security-title">100% SEGURO</h3>
                  <p className="security-subtitle">Tu wallet, tu control</p>
                </div>
              </div>
              
              <div className="security-features">
                <div className="feature">
                  <span className="checkmark">✓</span>
                  <span>Sin firma de transacciones</span>
                </div>
                <div className="feature">
                  <span className="checkmark">✓</span>
                  <span>Datos públicos on-chain</span>
                </div>
                <div className="feature">
                  <span className="checkmark">✓</span>
                  <span>Medalla GRATIS (solo firmas mensaje)</span>
                </div>
              </div>
            </div>
            
            {/* CTAs MEJORADOS */}
            <div className="cta-group">
              <a href="#burn" className="cta-primary">
                🔥 QUIERO COMPETIR
              </a>
              
              <a href="#leaderboard" className="cta-secondary">
                👀 Solo quiero ver el ranking
              </a>
            </div>
          </div>

          {/* STATS - Muestra el estado del juego */}
          <div className="spacing-lg">
            <BurnStats />
          </div>

          {/* LEADERBOARD - Competencia visible */}
          <div id="leaderboard" className="spacing-lg">
            <BurnLeaderboard />
          </div>

          {/* HOW TO BURN - Ahora sí, instrucciones */}
          <div id="burn" className="spacing-lg">
            <HowToBurn />
          </div>

          {/* WALLET LOOKUP - Buscar posición y reclamar NFT */}
          <div className="spacing-lg">
            <WalletLookup />
          </div>

          {/* CLAIM BADGE - Sistema de badges con Google Sheets */}
          <div className="spacing-lg">
            <ClaimBadge />
          </div>

          {/* RECENT BURNS - Actividad */}
          <div className="spacing-md">
            <RecentBurns />
          </div>

          {/* DONATE - Al final, opcional */}
          <div className="spacing-lg">
            <DonateButton />
          </div>

          {/* WARNING */}
          <div className="warning-box mt-8">
            <strong>⚠️ ADVERTENCIA:</strong> Quemar tokens es permanente y probablemente no es una buena decisión financiera. Pero tú ya lo sabías, ¿verdad?
          </div>

        </main>

        {/* FOOTER */}
        <footer className="disclaimer-footer">
          <p>no es consejo financiero • probablemente nada • haz tu propia investigación</p>
          <p className="mt-1">doggy bimsness club © 2024</p>
          <p className="text-xs mt-2">
            <a href="https://solscan.io" target="_blank" rel="noopener" className="hover:underline">
              Ver en Solscan
            </a>
            {' • '}
            <a href="/api/burns" target="_blank" className="hover:underline">
              API
            </a>
          </p>
        </footer>

      </div>
    </div>
  );
}
