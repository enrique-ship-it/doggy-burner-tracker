// API Route para obtener burns de DOGGY
// Sprint 1: Endpoint con caching

import { NextResponse } from 'next/server';
import { scanBurns, scanBurnsFallback, calculateLeaderboard, calculateGlobalStats } from '@/lib/scanner';
import { ApiResponse } from '@/lib/types';

// Cache de 30 segundos
export const revalidate = 30;

export async function GET() {
  try {
    // Escanear hasta 1000 burns (esto buscará en ~10,000 transacciones si es necesario)
    console.log('[API] Starting burn scan...');
    const burns = await scanBurns(1000);
    console.log(`[API] Scan complete: ${burns.length} burns found`);
    
    // Calcular leaderboard y stats
    const leaderboard = calculateLeaderboard(burns);
    const stats = calculateGlobalStats(burns);

    const response: ApiResponse = {
      burns: burns.slice(0, 20), // Últimas 20 para el frontend
      leaderboard: leaderboard.slice(0, 20), // Top 20 burners
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
