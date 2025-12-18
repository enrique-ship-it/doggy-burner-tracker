// Scanner de blockchain para detectar burns de DOGGY
// Sprint 1: Implementación completa

import { connection, DOGGY_MINT, BURN_ADDRESS, DOGGY_DECIMALS, getLevel } from './solana';
import { BurnTransaction, BurnerStats, GlobalStats } from './types';
import { ParsedTransactionWithMeta } from '@solana/web3.js';

/**
 * Escanea la blockchain buscando burns de DOGGY
 * Un "burn" es una transferencia de DOGGY al BURN_ADDRESS
 */
export async function scanBurns(limit: number = 100): Promise<BurnTransaction[]> {
  try {
    // Usamos Helius Enhanced API para obtener transfers del token DOGGY
    const heliusApiKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
    
    if (!heliusApiKey) {
      console.error('HELIUS_API_KEY no configurada');
      return [];
    }

    // Helius API para obtener historial de transfers de un token a una dirección específica
    const response = await fetch(
      `https://api.helius.xyz/v0/addresses/${BURN_ADDRESS.toString()}/transactions?api-key=${heliusApiKey}&type=TRANSFER`
    );

    if (!response.ok) {
      console.error('Error fetching from Helius:', response.status);
      return [];
    }

    const transactions = await response.json();
    const burns: BurnTransaction[] = [];

    for (const tx of transactions) {
      // Buscar transfers de DOGGY en esta transacción
      const burnData = extractBurnFromHeliusTx(tx);
      if (burnData) {
        burns.push(burnData);
      }

      // Limitar resultados
      if (burns.length >= limit) break;
    }

    return burns;
  } catch (error) {
    console.error('Error en scanBurns:', error);
    return [];
  }
}

/**
 * Extrae datos de burn de una transacción de Helius
 */
function extractBurnFromHeliusTx(tx: any): BurnTransaction | null {
  try {
    // Helius devuelve transacciones parseadas con tokenTransfers
    if (!tx.tokenTransfers || tx.tokenTransfers.length === 0) {
      return null;
    }

    // Buscar transfer de DOGGY al burn address
    for (const transfer of tx.tokenTransfers) {
      const isDoggy = transfer.mint === DOGGY_MINT.toString();
      // Helius puede usar 'toUserAccount' o 'toTokenAccount'
      const destinationWallet = transfer.toUserAccount || '';
      const isToBurn = destinationWallet === BURN_ADDRESS.toString();

      // Debug: descomentar para ver qué transacciones se están procesando
      // console.log(`Transfer: mint=${transfer.mint?.slice(0,8)}, to=${destinationWallet?.slice(0,8)}, isDoggy=${isDoggy}, isToBurn=${isToBurn}`);

      if (isDoggy && isToBurn) {
        // Convertir de unidades mínimas a tokens
        const amount = transfer.tokenAmount / Math.pow(10, DOGGY_DECIMALS);
        
        return {
          signature: tx.signature,
          from: transfer.fromUserAccount,
          amount: amount,
          timestamp: tx.timestamp * 1000, // Helius da segundos, convertir a ms
          slot: tx.slot,
        };
      }
    }

    return null;
  } catch (error) {
    console.error('Error parsing tx:', error);
    return null;
  }
}

/**
 * Método alternativo: usar getSignaturesForAddress + getParsedTransaction
 * Más lento pero funciona sin Helius Enhanced API
 */
export async function scanBurnsFallback(limit: number = 100): Promise<BurnTransaction[]> {
  try {
    // Obtener signatures de transacciones al burn address
    const signatures = await connection.getSignaturesForAddress(
      BURN_ADDRESS,
      { limit: limit * 2 } // Pedimos más porque filtraremos
    );

    const burns: BurnTransaction[] = [];

    // Procesar en batches para no saturar
    const batchSize = 10;
    for (let i = 0; i < signatures.length && burns.length < limit; i += batchSize) {
      const batch = signatures.slice(i, i + batchSize);
      
      const txPromises = batch.map(sig =>
        connection.getParsedTransaction(sig.signature, {
          maxSupportedTransactionVersion: 0,
        })
      );

      const transactions = await Promise.all(txPromises);

      for (let j = 0; j < transactions.length; j++) {
        const tx = transactions[j];
        if (!tx) continue;

        const burnData = extractBurnFromParsedTx(tx, batch[j].signature);
        if (burnData) {
          burns.push(burnData);
        }
      }
    }

    return burns;
  } catch (error) {
    console.error('Error en scanBurnsFallback:', error);
    return [];
  }
}

/**
 * Extrae datos de burn de una transacción parseada de Solana
 */
function extractBurnFromParsedTx(
  tx: ParsedTransactionWithMeta,
  signature: string
): BurnTransaction | null {
  try {
    const instructions = tx.transaction.message.instructions;

    for (const ix of instructions) {
      // Buscar instrucciones de token transfer
      if ('parsed' in ix && ix.program === 'spl-token') {
        const parsed = ix.parsed;
        
        if (parsed.type === 'transfer' || parsed.type === 'transferChecked') {
          const info = parsed.info;
          
          // Verificar que el destino sea el burn address
          // Nota: info.destination es la token account, no la wallet
          // Necesitamos verificar el mint
          if (info.mint === DOGGY_MINT.toString()) {
            const amount = parsed.type === 'transferChecked' 
              ? info.tokenAmount.uiAmount 
              : Number(info.amount) / Math.pow(10, DOGGY_DECIMALS);

            return {
              signature,
              from: info.authority || info.source,
              amount,
              timestamp: (tx.blockTime || 0) * 1000,
              slot: tx.slot,
            };
          }
        }
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Calcula el leaderboard a partir de los burns
 */
export function calculateLeaderboard(burns: BurnTransaction[]): BurnerStats[] {
  // Agrupar burns por dirección
  const burnerMap = new Map<string, {
    totalBurned: number;
    burnCount: number;
    firstBurn: number;
    lastBurn: number;
  }>();

  for (const burn of burns) {
    const existing = burnerMap.get(burn.from);
    
    if (existing) {
      existing.totalBurned += burn.amount;
      existing.burnCount += 1;
      existing.firstBurn = Math.min(existing.firstBurn, burn.timestamp);
      existing.lastBurn = Math.max(existing.lastBurn, burn.timestamp);
    } else {
      burnerMap.set(burn.from, {
        totalBurned: burn.amount,
        burnCount: 1,
        firstBurn: burn.timestamp,
        lastBurn: burn.timestamp,
      });
    }
  }

  // Convertir a array y ordenar por total quemado
  const leaderboard: BurnerStats[] = Array.from(burnerMap.entries())
    .map(([address, stats]) => ({
      address,
      totalBurned: stats.totalBurned,
      burnCount: stats.burnCount,
      level: getLevel(stats.totalBurned),
      firstBurn: stats.firstBurn,
      lastBurn: stats.lastBurn,
    }))
    .sort((a, b) => b.totalBurned - a.totalBurned);

  return leaderboard;
}

/**
 * Calcula estadísticas globales
 */
export function calculateGlobalStats(burns: BurnTransaction[]): GlobalStats {
  const uniqueBurners = new Set(burns.map(b => b.from));
  const totalBurned = burns.reduce((sum, b) => sum + b.amount, 0);

  return {
    totalBurned,
    totalBurners: uniqueBurners.size,
    totalTransactions: burns.length,
    lastUpdate: Date.now(),
  };
}
