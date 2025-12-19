'use client';

import Image from 'next/image';
import { BurnLeaderboard } from '@/components/BurnLeaderboard';
import { BurnStats } from '@/components/BurnStats';
import { BurnInterface } from '@/components/BurnInterface';
import { WalletLookup } from '@/components/WalletLookup';
import { RecentBurns } from '@/components/RecentBurns';
import { HowToBurn } from '@/components/HowToBurn';
import { ClaimNFT } from '@/components/ClaimNFT';
import { DonateButton } from '@/components/DonateButton';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Home() {
  return (
    <div className="bg-burning-money">
      <div className="bg-overlay">
        
        {/* HEADER */}
        <header className="header-bimsness -mx-0 px-6 py-5 mb-8 sticky top-0 z-50 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image 
                src="/doggy.png" 
                alt="Doggy" 
                width={64} 
                height={64}
                className="doggy-mascot-sm"
              />
              <div>
                <h1 className="text-2xl text-white font-bold">
                  <span className="dollar-sign dollar-md mr-1">$</span>
                  DOGGY BIMSNESS
                </h1>
                <p className="text-sm text-white/90 font-semibold">Burn Tracker Oficial</p>
              </div>
            </div>
            <div className="flex gap-3">
              <WalletMultiButton className="btn-win98 btn-navy btn-sm" />
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="max-w-6xl mx-auto px-4 pb-12">
          
          {/* HERO - Compacto y directo */}
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
            <p className="subtitle-meme-enhanced text-lg mb-6">
              donde los tokens vienen a morir (profesionalmente)
            </p>
            
            {/* CTA Principal único */}
            <a href="#burn" className="btn-win98 btn-tie btn-xl inline-block">
              🔥 Empezar a Quemar
            </a>
          </div>

          {/* HOW TO BURN - Tutorial primero */}
          <div className="spacing-lg">
            <HowToBurn />
          </div>

          {/* 2 COLUMN LAYOUT: BURN & LOOKUP - Acción primaria */}
          <div id="burn" className="spacing-xl grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* BURN INTERFACE - Ocupa 2/3 del espacio */}
            <div className="lg:col-span-2">
              <BurnInterface />
            </div>
            
            {/* WALLET LOOKUP - Ocupa 1/3 del espacio */}
            <div className="lg:col-span-1">
              <WalletLookup />
            </div>
          </div>

          {/* STATS - Contexto del juego */}
          <div className="spacing-lg">
            <BurnStats />
          </div>

          {/* LEADERBOARD - Competencia */}
          <div id="leaderboard" className="spacing-lg">
            <BurnLeaderboard />
          </div>

          {/* RECENT BURNS - Actividad */}
          <div className="spacing-md">
            <RecentBurns />
          </div>

          {/* CLAIM NFT - Recompensa (solo para quienes YA quemaron) */}
          <div id="nft" className="spacing-xl">
            <ClaimNFT />
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
