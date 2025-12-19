'use client';

import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { DOGGY_MINT, BURN_ADDRESS, formatMillions } from '../lib/solana';
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

  // Fetch PDA balance on-chain
  useEffect(() => {
    async function fetchPdaBalance() {
      try {
        const connection = new Connection(
          `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`,
          'confirmed'
        );
        
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          
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
            <p className="text-meme">burn lords activos</p>
            <p className="text-xs text-gray-500 mt-1">
              {stats.totalTransactions} burns totales
            </p>
          </div>

        </div>

        <div className="mt-6 pt-4 border-t-2 border-gray-300">
          <h3 className="text-meme-bold text-center mb-4">📉 Impacto de Deflación</h3>
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded border-2 border-fire">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="text-center">
                <p className="text-3xl font-bold text-fire">
                  {calculateDeflation(stats.totalBurned).toFixed(3)}%
                </p>
                <p className="text-meme text-sm mt-1">del supply quemado</p>
                <p className="text-xs text-gray-600 mt-1">
                  Supply total: {calculateTotalSupply().toLocaleString()}
                </p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-fire">
                  {formatMillions(stats.totalBurned)} 🔥
                </p>
                <p className="text-meme text-sm mt-1">tokens irrecuperables</p>
                <p className="text-xs text-gray-600 mt-1">
                  Enviados a {BURN_ADDRESS.toBase58().slice(0, 8)}...
                </p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-fire">
                  {stats.totalBurners}
                </p>
                <p className="text-meme text-sm mt-1">wallets participando</p>
                <p className="text-xs text-gray-600 mt-1">
                  <a
                    href={`https://solscan.io/account/${BURN_ADDRESS.toBase58()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fire hover:underline"
                  >
                    Ver burns en Solscan ↗
                  </a>
                </p>
              </div>

            </div>
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

