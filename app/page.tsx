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
        <header className="header-bimsness -mx-0 px-6 py-4 mb-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image 
                src="/doggy.png" 
                alt="Doggy" 
                width={50} 
                height={50}
                className="doggy-mascot-sm"
              />
              <div>
                <h1 className="text-xl text-white font-bold">
                  <span className="dollar-sign dollar-md mr-1">$</span>
                  DOGGY BIMSNESS
                </h1>
                <p className="text-xs text-white/70">Burn Tracker Oficial</p>
              </div>
            </div>
            <div className="flex gap-2">
              <WalletMultiButton className="btn-win98 btn-navy" />
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="max-w-6xl mx-auto px-4 pb-12">
          
          {/* HERO */}
          <div className="text-center mb-12">
            <Image 
              src="/doggy.png" 
              alt="Doggy Bimsness" 
              width={200} 
              height={200}
              className="doggy-mascot-lg mx-auto mb-4"
            />
            <h2 className="title-meme mb-2">
              <span className="fire-emoji">🔥</span> DOGGY BURN TRACKER <span className="fire-emoji">🔥</span>
            </h2>
            <p className="subtitle-meme mb-6">
              donde los tokens vienen a morir (profesionalmente)
            </p>
          </div>

          {/* STATS */}
          <BurnStats />

          {/* 2 COLUMN LAYOUT: BURN & LOOKUP */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* BURN INTERFACE */}
            <BurnInterface />
            
            {/* WALLET LOOKUP */}
            <WalletLookup />
          </div>

          {/* HOW TO BURN - Alternative method */}
          <div className="mt-12">
            <HowToBurn />
          </div>

          {/* LEADERBOARD */}
          <div className="mt-12">
            <BurnLeaderboard />
          </div>

          {/* CLAIM NFT */}
          <div className="mt-12">
            <ClaimNFT />
          </div>

          {/* RECENT BURNS */}
          <div className="mt-12">
            <RecentBurns />
          </div>

          {/* DONATE */}
          <div className="mt-12">
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
