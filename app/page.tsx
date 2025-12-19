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
          
          {/* HERO - Explicación clara del propósito */}
          <div className="text-center mb-12 max-h-[60vh]">
            <Image 
              src="/doggy.png" 
              alt="Doggy Bimsness" 
              width={180} 
              height={180}
              className="doggy-mascot-lg mx-auto mb-4"
            />
            <h2 className="title-meme text-3xl mb-2">
              <span className="fire-emoji">🔥</span> DOGGY BURN TRACKER <span className="fire-emoji">🔥</span>
            </h2>
            <p className="subtitle-meme-enhanced text-lg mb-4">
              La competencia oficial de quema de tokens DOGGY
            </p>
            
            {/* Propuesta de valor clara + SEGURIDAD */}
            <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-6 rounded-lg border-2 border-gray-300 shadow-lg mb-6">
              <p className="text-meme text-base mb-3">
                <strong>¿Qué es esto?</strong> El leaderboard oficial donde la comunidad DOGGY compite quemando tokens.
              </p>
              <p className="text-meme text-base mb-3">
                <strong>¿Qué ganas?</strong> Apareces en el ranking público, reduces el supply, te conviertes en DoggyQuemador 🏆 <strong>y recibes tu badge conmemorativo "The Doggy Burner"</strong> 🔥
              </p>
              
              {/* SEGURIDAD DESTACADA */}
              <div className="bg-green-50 border-2 border-green-500 p-4 rounded mt-4 mb-3">
                <p className="text-sm font-bold text-green-800 mb-2">
                  🔒 <strong>100% SEGURO - SOLO VES LOS BURNS</strong>
                </p>
                <p className="text-xs text-green-700">
                  Nunca te pedimos conectar tu wallet. Todo es manual y verificable on-chain. 
                  Tu wallet, tu control total.
                </p>
              </div>
              
              <p className="text-meme text-sm text-gray-600">
                Cuantos más DOGGY quemes, más alto subes en el leaderboard. Simple.
              </p>
            </div>
            
            {/* CTA Principal */}
            <a href="#burn" className="btn-win98 btn-tie btn-xl inline-block">
              🔥 Ver Cómo Participar
            </a>
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
