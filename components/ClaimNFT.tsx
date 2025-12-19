'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect } from 'react';

interface ClaimNFTProps {
  walletAddress?: string;
}

type BurnLevel = 'bronce' | 'plata' | 'oro' | null;

interface BurnerInfo {
  totalBurned: number;
  level: BurnLevel;
  rank: number;
}

export function ClaimNFT({ walletAddress }: ClaimNFTProps) {
  const wallet = useWallet();
  const [burnerInfo, setBurnerInfo] = useState<BurnerInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [minting, setMinting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'info' | 'success' | 'error'>('info');

  const address = walletAddress || wallet.publicKey?.toBase58();

  useEffect(() => {
    if (!address) return;

    async function fetchBurnerInfo() {
      setLoading(true);
      try {
        const res = await fetch('/api/burns');
        const data = await res.json();
        
        const burner = data.leaderboard.find((b: any) => b.address === address);
        if (burner) {
          const rank = data.leaderboard.findIndex((b: any) => b.address === address) + 1;
          setBurnerInfo({
            totalBurned: burner.totalBurned,
            level: burner.level,
            rank
          });
        }
      } catch (error) {
        console.error('Error fetching burner info:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBurnerInfo();
  }, [address]);

  const getNFTInfo = (level: BurnLevel) => {
    switch (level) {
      case 'bronce':
        return {
          name: 'The Burner - Bronce',
          emoji: '🥉',
          description: 'Has quemado entre 10K-99K DOGGY',
          color: 'from-orange-200 to-amber-300',
          borderColor: 'border-orange-400'
        };
      case 'plata':
        return {
          name: 'The Burner - Plata',
          emoji: '🥈',
          description: 'Has quemado entre 100K-999K DOGGY',
          color: 'from-gray-200 to-gray-300',
          borderColor: 'border-gray-400'
        };
      case 'oro':
        return {
          name: 'The Burner - Oro',
          emoji: '🥇',
          description: 'Has quemado más de 1M DOGGY',
          color: 'from-yellow-200 to-amber-400',
          borderColor: 'border-yellow-500'
        };
      default:
        return null;
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1) return `${num.toFixed(2)}M`;
    if (num >= 0.001) return `${(num * 1000).toFixed(0)}K`;
    return `${(num * 1000000).toFixed(0)}`;
  };

  const handleMintNFT = async () => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      setMessage('Conecta tu wallet para mintear');
      setMessageType('error');
      return;
    }

    if (!burnerInfo?.level) {
      setMessage('Debes quemar al menos 10K DOGGY para obtener un NFT');
      setMessageType('error');
      return;
    }

    setMinting(true);
    setMessage('Verificando burns en blockchain...');
    setMessageType('info');

    try {
      // CRÍTICO: Validar server-side antes de mintear
      // Esto previene que usuarios manipulen burnerInfo en el cliente
      const verifyResponse = await fetch('/api/verify-burns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          walletAddress: wallet.publicKey.toBase58() 
        })
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.eligible) {
        setMessage(verifyData.error || 'No calificas para mintear NFT');
        setMessageType('error');
        setMinting(false);
        return;
      }

      // Usuario verificado - proceder con mint usando datos del servidor
      setMessage('Preparando tu NFT certificado...');
      
      // Importar dinámicamente para evitar errores de SSR
      const { mintBurnerNFT } = await import('@/lib/nft');
      
      setMessage('Subiendo metadata a Arweave...');
      
      // Usar stats verificadas del servidor, no del cliente
      const result = await mintBurnerNFT(
        wallet,
        verifyData.burnerStats.level,
        verifyData.burnerStats.totalBurned
      );

      setMessage(`🎉 ¡NFT Minteado! ${result.address.slice(0, 4)}...${result.address.slice(-4)}`);
      setMessageType('success');
      
      // Abrir Solscan en nueva ventana
      setTimeout(() => {
        window.open(`https://solscan.io/token/${result.address}`, '_blank');
      }, 1500);
      
    } catch (error: any) {
      console.error('Error minting NFT:', error);
      setMessage(`Error: ${error.message || 'No se pudo mintear el NFT. Intenta de nuevo.'}`);
      setMessageType('error');
    } finally {
      setMinting(false);
    }
  };

  if (loading) {
    return (
      <div className="window-98">
        <div className="window-titlebar">
          <span>🎨 claim-nft.exe</span>
          <span>—  ▢  ✕</span>
        </div>
        <div className="window-content text-center py-8">
          <p className="text-meme">Verificando tu estatus de Burn Lord...</p>
        </div>
      </div>
    );
  }

  if (!wallet.connected && !walletAddress) {
    return (
      <div className="window-98">
        <div className="window-titlebar">
          <span>🎨 claim-nft.exe - NFT Certificado</span>
          <span>—  ▢  ✕</span>
        </div>
        <div className="window-content text-center py-8">
          <div className="mb-6">
            <div className="text-6xl mb-4">🔥</div>
            <h3 className="text-meme-bold text-xl mb-3">NFT Certificado Gratis</h3>
            <p className="text-meme text-sm text-gray-600 mb-2">
              Demuestra tu estatus de Burn Lord on-chain
            </p>
            <p className="text-xs text-fire font-bold">
              Solo pagas gas (~0.01 SOL)
            </p>
          </div>
          <WalletMultiButton className="btn-win98 btn-fire mx-auto" />
        </div>
      </div>
    );
  }

  if (!burnerInfo) {
    return (
      <div className="window-98">
        <div className="window-titlebar">
          <span>🎨 claim-nft.exe - No Calificado</span>
          <span>—  ▢  ✕</span>
        </div>
        <div className="window-content text-center py-8">
          <div className="text-5xl mb-4">😢</div>
          <h3 className="text-meme-bold text-lg mb-3">No Calificas Aún</h3>
          <p className="text-meme text-sm mb-4 text-gray-600">
            Necesitas quemar al menos <strong>10,000 DOGGY</strong> para obtener tu NFT certificado
          </p>
          <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200 text-left max-w-xs mx-auto">
            <p className="text-xs text-gray-700 mb-2">
              <strong>¿Cómo conseguirlo?</strong>
            </p>
            <p className="text-xs text-gray-600">
              Ve a la sección "Cómo Quemar" arriba y envía DOGGY a la dirección oficial. Aparecerás en el leaderboard y podrás reclamar tu NFT.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const nftInfo = getNFTInfo(burnerInfo.level);
  if (!nftInfo) return null;

  return (
    <div className="window-98">
      <div className="window-titlebar">
        <span>🎨 claim-nft.exe - {nftInfo.name}</span>
        <span>—  ▢  ✕</span>
      </div>
      <div className="window-content">
        
        {/* HEADER */}
        <div className="text-center mb-6">
          <h3 className="text-meme-bold text-xl mb-2">
            ¡Calificas para un NFT Certificado!
          </h3>
          <p className="text-meme text-sm text-gray-600">
            Has quemado <strong className="text-fire">{formatNumber(burnerInfo.totalBurned)} DOGGY</strong>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Ranking #{burnerInfo.rank} • Nivel: {burnerInfo.level?.toUpperCase() || 'DESCONOCIDO'}
          </p>
        </div>

        {/* NFT PREVIEW - Grid 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Imagen del NFT */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-xs">
              <img 
                src={`/nfts/${burnerInfo.level}.png`}
                alt={`NFT ${burnerInfo.level}`}
                className={`w-full h-auto rounded-lg border-4 ${nftInfo.borderColor} shadow-lg`}
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-3 font-semibold">
              Tu certificado nivel {burnerInfo.level.toUpperCase()}
            </p>
          </div>

          {/* Info y Stats */}
          <div className={`bg-gradient-to-br ${nftInfo.color} p-6 rounded-lg border-4 ${nftInfo.borderColor} relative overflow-hidden flex flex-col justify-center`}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-bl-full"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3 animate-pulse">{nftInfo.emoji}</div>
                <h4 className="text-2xl font-bold mb-2 text-gray-800">{nftInfo.name}</h4>
                <p className="text-sm text-gray-700">{nftInfo.description}</p>
              </div>
              
              <div className="mt-4 pt-4 border-t-2 border-black/10">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/50 rounded p-3">
                    <p className="text-xs text-gray-600 mb-1">Total Quemado</p>
                    <p className="font-bold text-gray-800 text-base">{formatNumber(burnerInfo.totalBurned)} DOGGY</p>
                  </div>
                  <div className="bg-white/50 rounded p-3">
                    <p className="text-xs text-gray-600 mb-1">Ranking</p>
                    <p className="font-bold text-gray-800 text-base">#{burnerInfo.rank}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MINT BUTTON */}
        <div className="space-y-4">
          <button
            onClick={handleMintNFT}
            disabled={minting}
            className="btn-win98 btn-fire btn-xl w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {minting ? '⏳ Minteando tu certificado...' : '🎨 Mintear NFT Certificado'}
          </button>

          {/* PRICING INFO */}
          <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-300 text-center">
            <p className="text-xs text-gray-600 mb-1">
              💰 <strong>100% Gratis</strong> - Solo pagas el gas de la red
            </p>
            <p className="text-xs text-fire font-bold">
              ~0.01 SOL (aprox $2 USD)
            </p>
          </div>

          {/* MESSAGE */}
          {message && (
            <div className={`p-4 rounded-lg border-2 text-sm ${
              messageType === 'success' ? 'bg-green-50 border-green-500 text-green-700' :
              messageType === 'error' ? 'bg-red-50 border-red-500 text-red-700' :
              'bg-blue-50 border-blue-500 text-blue-700'
            }`}>
              {message}
            </div>
          )}

          {/* BENEFITS */}
          <div className="text-center text-xs text-gray-600 pt-4 border-t-2 border-gray-300">
            <p className="font-bold mb-2">✨ Beneficios del NFT:</p>
            <ul className="space-y-1 text-left max-w-xs mx-auto">
              <li>• Certificado verificable on-chain</li>
              <li>• Prueba de que eres un verdadero Burn Lord</li>
              <li>• Coleccionable único según tu nivel</li>
              <li>• Flex en tu wallet forever</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
