'use client';

import { useState, useEffect } from 'react';
import { BurnTransaction } from '@/lib/types';

export function RecentBurns() {
  const [burns, setBurns] = useState<BurnTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBurns = async () => {
      try {
        const res = await fetch('/api/burns');
        const data = await res.json();
        setBurns(data.burns || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching burns:', error);
        setLoading(false);
      }
    };

    fetchBurns();
    const interval = setInterval(fetchBurns, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'hace un momento';
    if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} min`;
    if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)} hrs`;
    return `hace ${Math.floor(seconds / 86400)} días`;
  };

  const formatBurnAmount = (amountInMillions: number): string => {
    // API devuelve amount ya en millones (0.2 = 200K DOGGY)
    const exactTokens = amountInMillions * 1_000_000;
    
    if (exactTokens >= 1_000_000) {
      return `${amountInMillions.toFixed(2)}M`;
    }
    if (exactTokens >= 1_000) {
      return `${(exactTokens / 1_000).toFixed(0)}K`;
    }
    return exactTokens.toLocaleString();
  };

  const truncateAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (loading) {
    return (
      <div className="window-98">
        <div className="window-titlebar">
          <span>🔥 burns-recientes.txt</span>
          <span>—  ▢  ✕</span>
        </div>
        <div className="window-content text-center py-8">
          <p className="text-meme">Cargando últimas quemas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="window-98">
      <div className="window-titlebar">
        <span>🔥 burns-recientes.txt - Últimas 20 Quemas</span>
        <span>—  ▢  ✕</span>
      </div>
      <div className="window-content">
        
        {burns.length === 0 ? (
          <p className="text-meme text-center py-8">
            No se han detectado burns todavía... ¿Serás el primero? 🔥
          </p>
        ) : (
          <div className="space-y-2">
            {burns.map((burn, index) => (
              <div
                key={burn.signature}
                className="flex items-center justify-between p-3 bg-gray-50 hover:bg-orange-50 rounded border-2 border-gray-300 hover:border-fire transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Número de burn */}
                  <span className="text-xs font-mono text-gray-500 w-8 text-right">
                    #{index + 1}
                  </span>
                  
                  {/* Info principal */}
                  <div className="flex-1 min-w-0">
                    {/* Amount destacado */}
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-fire font-bold text-lg">
                        {formatBurnAmount(burn.amount)}
                      </span>
                      <span className="text-gray-600 text-sm font-medium">
                        DOGGY
                      </span>
                    </div>
                    
                    {/* Dirección y metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span className="font-mono">
                        {truncateAddress(burn.from)}
                      </span>
                      <span>•</span>
                      <span>{formatTimeAgo(burn.timestamp)}</span>
                      <span>•</span>
                      <a
                        href={`https://solscan.io/tx/${burn.signature}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fire hover:underline inline-flex items-center gap-1"
                      >
                        Ver tx ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 pt-4 border-t-2 border-gray-300 text-center">
          <p className="text-xs text-gray-600">
            Actualización automática cada 30 segundos
          </p>
        </div>

      </div>
    </div>
  );
}
