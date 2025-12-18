// Scanner de blockchain para detectar burns de DOGGY
// TODO: Implementar en Sprint 1

import { BurnTransaction, BurnerStats, GlobalStats } from './types';

export async function scanBurns(limit: number = 100): Promise<BurnTransaction[]> {
  // TODO: Implementar en Sprint 1
  console.log('scanBurns - TODO: implementar');
  return [];
}

export function calculateLeaderboard(burns: BurnTransaction[]): BurnerStats[] {
  // TODO: Implementar en Sprint 1
  console.log('calculateLeaderboard - TODO: implementar');
  return [];
}

export function calculateGlobalStats(burns: BurnTransaction[]): GlobalStats {
  // TODO: Implementar en Sprint 1
  return {
    totalBurned: 0,
    totalBurners: 0,
    totalTransactions: 0,
    lastUpdate: Date.now(),
  };
}
