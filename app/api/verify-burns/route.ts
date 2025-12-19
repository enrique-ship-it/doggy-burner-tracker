// API route para verificar burns de un usuario antes de permitir mint de NFT
// CRÍTICO: Validación server-side para evitar exploits

import { NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { scanBurns, calculateLeaderboard } from '@/lib/scanner';
import { getServerConnection } from '@/lib/server-connection';

export async function POST(request: Request) {
  try {
    const { walletAddress } = await request.json();

    // Validar que se proporcionó una wallet
    if (!walletAddress || typeof walletAddress !== 'string') {
      return NextResponse.json(
        { error: 'Wallet address requerida' },
        { status: 400 }
      );
    }

    // Validar que es una PublicKey válida
    let publicKey: PublicKey;
    try {
      publicKey = new PublicKey(walletAddress);
    } catch {
      return NextResponse.json(
        { error: 'Wallet address inválida' },
        { status: 400 }
      );
    }

    // Usar connection server-side con API key protegida
    const serverConn = getServerConnection();

    // Escanear burns reales en blockchain
    console.log(`[Verify] Verificando burns para ${walletAddress}`);
    const allBurns = await scanBurns(1000, serverConn);
    
    // Calcular leaderboard con datos reales
    const leaderboard = calculateLeaderboard(allBurns);
    
    // Buscar la wallet en el leaderboard
    const burnerStats = leaderboard.find(b => b.address === walletAddress);

    if (!burnerStats) {
      return NextResponse.json(
        { 
          eligible: false,
          error: 'No se encontraron burns para esta wallet. Mínimo: 10,000 DOGGY'
        },
        { status: 403 }
      );
    }

    // Verificar mínimo (10K DOGGY = 0.01M)
    const MIN_BURN_FOR_NFT = 0.01; // en millones
    if (burnerStats.totalBurned < MIN_BURN_FOR_NFT) {
      return NextResponse.json(
        {
          eligible: false,
          error: `Mínimo no alcanzado. Tienes ${burnerStats.totalBurned.toFixed(4)}M, necesitas ${MIN_BURN_FOR_NFT}M`
        },
        { status: 403 }
      );
    }

    // Usuario es elegible - retornar stats verificadas
    return NextResponse.json({
      eligible: true,
      burnerStats: {
        address: burnerStats.address,
        totalBurned: burnerStats.totalBurned,
        level: burnerStats.level,
        burnCount: burnerStats.burnCount,
        rank: leaderboard.findIndex(b => b.address === walletAddress) + 1,
      }
    });

  } catch (error: any) {
    console.error('[Verify] Error:', error);
    return NextResponse.json(
      { error: 'Error verificando burns', details: error.message },
      { status: 500 }
    );
  }
}
