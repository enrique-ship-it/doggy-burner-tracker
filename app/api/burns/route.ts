// API Route para obtener burns de DOGGY
// Sprint 1: Endpoint con caching

import { NextResponse } from 'next/server';
import { scanBurns, scanBurnsFallback, calculateLeaderboard, calculateGlobalStats } from '@/lib/scanner';
import { getServerConnection } from '@/lib/server-connection';
import { getAllBadgeHolders } from '@/lib/sheets';
import { ApiResponse } from '@/lib/types';

// Cache de 30 segundos
export const revalidate = 30;

export async function GET() {
  try {
    // Usar server connection con API key protegida
    const serverConn = getServerConnection();
    
    // Escanear hasta 1000 burns (esto buscará en ~10,000 transacciones si es necesario)
    console.log('[API] Starting burn scan...');
    const burns = await scanBurns(1000, serverConn);
    console.log(`[API] Scan complete: ${burns.length} burns found`);
    
    // Obtener badges reclamados
    const badgeHolders = await getAllBadgeHolders();
    console.log(`[API] Badge holders found: ${badgeHolders.length}`);
    if (badgeHolders.length > 0) {
      console.log('[API] Sample badge holder:', badgeHolders[0]);
    }
    const badgeWallets = new Set(badgeHolders.map(b => b.wallet.toLowerCase()));
    
    // Calcular leaderboard y stats
    const leaderboard = calculateLeaderboard(burns);
    
    // Agregar información de badge reclamado
    const leaderboardWithBadges = leaderboard.map(entry => ({
      ...entry,
      hasBadge: badgeWallets.has(entry.address.toLowerCase()),
    }));
    
    const stats = calculateGlobalStats(burns);

    const response: ApiResponse = {
      burns: burns.slice(0, 20), // Últimas 20 para el frontend
      leaderboard: leaderboardWithBadges.slice(0, 20), // Top 20 burners
      stats,
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('Error en API /burns:', error);
    
    // Retornar respuesta vacía en caso de error
    const emptyResponse: ApiResponse = {
      burns: [],
      leaderboard: [],
      stats: {
        totalBurned: 0,
        totalBurners: 0,
        totalTransactions: 0,
        lastUpdate: Date.now(),
      },
    };

    return NextResponse.json(emptyResponse, { status: 500 });
  }
}
