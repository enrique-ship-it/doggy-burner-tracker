'use client';

import { useEffect, useState } from 'react';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { connection, DOGGY_MINT, BURN_ADDRESS, formatMillions } from '../lib/solana';
import { POLL_INTERVAL } from '../lib/constants';

interface GlobalStats {
  totalBurned: number;
  totalBurners: number;
  totalTransactions: number;
  lastUpdate: number;
}

export function BurnStats() {
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [pdaBalance, setPdaBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/burns');
        if (!res.ok) throw new Error('Error al cargar datos');
        const data = await res.json();
        setStats(data.stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Fetch PDA balance on-chain usando connection centralizada
  useEffect(() => {
    async function fetchPdaBalance() {
      try {
        const tokenAccount = await getAssociatedTokenAddress(
          DOGGY_MINT,
          BURN_ADDRESS
        );
        
        const balance = await connection.getTokenAccountBalance(tokenAccount);
        const amount = Number(balance.value.amount) / 1_000_000; // 6 decimals
        setPdaBalance(amount);
      } catch (err) {
        console.error('Error fetching PDA balance:', err);
        setPdaBalance(0); // Si no existe el token account, es 0
      }
    }

    fetchPdaBalance();
    const interval = setInterval(fetchPdaBalance, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="window-98">
        <div className="window-titlebar">
          <span>📊 estadisticas.exe</span>
          <span>—  ▢  ✕</span>
        </div>
        <div className="window-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="text-center">
                <div className="skeleton h-12 mb-2"></div>
                <div className="skeleton h-4 w-24 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="panel-burnt text-center py-8">
        <p className="text-meme-bold text-fire">❌ Error al cargar estadísticas</p>
        <p className="text-meme text-sm mt-2">{error || 'Datos no disponibles'}</p>
      </div>
    );
  }

  // La API ya devuelve tokens en millones (ej: 2.2 = 2.2M DOGGY)

  const formatExactTokens = (millions: number): string => {
    const tokens = millions * 1_000_000;
    return tokens.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  const calculateTotalSupply = (): number => {
    return 1_000_000_000; // 1 mil millones DOGGY
  };

  const calculateDeflation = (millions: number): number => {
    const burned = millions * 1_000_000; // Convertir a tokens
    const totalSupply = calculateTotalSupply();
    return (burned / totalSupply) * 100;
  };

  const estimateValueInUSD = (millions: number): number => {
    // Precio aproximado basado en datos de mercado
    // 2.2M DOGGY ≈ $644.46 USD según Solscan
    const pricePerMillion = 644.46 / 2.2; // ≈ $293 por millón de DOGGY
    return millions * pricePerMillion;
  };

  return (
    <div className="window-98">
      <div className="window-titlebar">
        <span>📊 estadisticas.exe - Actualizado</span>
        <span>—  ▢  ✕</span>
      </div>
      <div className="window-content">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div>
            <p className="number-stonks shake-money">
              {formatMillions(stats.totalBurned)} DOGGY
            </p>
            <p className="text-meme">tokens quemados</p>
            <p className="text-xs text-gray-500 mt-1">
              {formatExactTokens(stats.totalBurned)} tokens exactos
            </p>
          </div>

          <div>
            <p className="number-stonks">
              <span className="dollar-sign dollar-md">$</span>
              {estimateValueInUSD(stats.totalBurned).toFixed(2)} USD
            </p>
            <p className="text-meme">valor destruido</p>
            <p className="text-xs text-gray-500 mt-1">
              precio aproximado de mercado
            </p>
          </div>

          <div>
            <p className="number-stonks number-red">
              {stats.totalBurners}
            </p>
            <p className="text-meme">DoggyQuemadores activos</p>
            <p className="text-xs text-gray-500 mt-1">
              {stats.totalTransactions} burns totales
            </p>
          </div>

          <div>
            <p className="number-stonks text-fire">
              {calculateDeflation(stats.totalBurned).toFixed(3)}%
            </p>
            <p className="text-meme">del supply quemado</p>
            <p className="text-xs text-gray-500 mt-1">
              Supply total: 1,000,000,000
            </p>
          </div>

        </div>

        <div className="mt-4 pt-4 border-t-2 border-gray-300">
          <p className="text-center text-xs text-gray-600 text-meme">
            💡 Los datos se actualizan cada 30 segundos (maybe)
          </p>
        </div>
      </div>
    </div>
  );
}

