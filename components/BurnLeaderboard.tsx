'use client';

import { useEffect, useState } from 'react';

interface BurnerStats {
  address: string;
  totalBurned: number;
  burnCount: number;
  level: 'chispa' | 'llamarada' | 'infierno';
  firstBurn: number;
  lastBurn: number;
}

export function BurnLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<BurnerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/burns');
        if (!res.ok) throw new Error('Error al cargar leaderboard');
        const data = await res.json();
        setLeaderboard(data.leaderboard || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  const getBadgeClass = (level: string) => {
    switch (level.toLowerCase()) {
      case 'infierno': return 'badge badge-infierno';
      case 'llamarada': return 'badge badge-llamarada';
      case 'chispa': return 'badge badge-chispa';
      default: return 'badge badge-chispa';
    }
  };

  const getMedal = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return null;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1: return 'rank-1';
      case 2: return 'rank-2';
      case 3: return 'rank-3';
      default: return '';
    }
  };

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  // La API devuelve valores ya en millones (ej: 1.031815 = 1.03M DOGGY)
  const formatBurned = (millions: number): string => {
    if (millions >= 1) {
      return `${millions.toFixed(2)}M`;
    }
    // Si es menor a 1M, mostrar en K
    const thousands = millions * 1000;
    if (thousands >= 1) {
      return `${thousands.toFixed(1)}K`;
    }
    // Si es muy pequeño, mostrar tokens exactos
    const tokens = millions * 1_000_000;
    return tokens.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  if (loading) {
    return (
      <div className="window-98 window-98-tie">
        <div className="window-titlebar">
          <span>🏆 leaderboard.exe</span>
          <span>—  ▢  ✕</span>
        </div>
        <div className="window-content">
          <p className="text-center text-meme py-8">Cargando DoggyQuemadores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="panel-burnt text-center py-8">
        <p className="text-meme-bold text-fire">❌ Error al cargar leaderboard</p>
        <p className="text-meme text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className="window-98 window-98-tie">
        <div className="window-titlebar">
          <span>🏆 leaderboard.exe</span>
          <span>—  ▢  ✕</span>
        </div>
        <div className="window-content text-center py-8">
          <p className="text-meme-bold">No hay DoggyQuemadores todavía</p>
          <p className="text-meme text-sm mt-2">Sé el primero en quemar 🔥</p>
        </div>
      </div>
    );
  }

  return (
    <div className="window-98 window-98-tie">
      <div className="window-titlebar">
        <span>🏆 leaderboard.exe - Top DoggyQuemadores</span>
        <span>—  ▢  ✕</span>
      </div>
      <div className="window-content p-0">
        <table className="table-leaderboard">
          <thead>
            <tr>
              <th className="w-16">#</th>
              <th>DoggyQuemador</th>
              <th className="text-right">Total Quemado</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => {
              const rank = index + 1;
              const medal = getMedal(rank);
              
              return (
                <tr key={entry.address}>
                  <td className={getRankClass(rank)}>
                    {medal || rank}
                  </td>
                  <td>
                  <div className="flex items-center gap-3">
                    {/* Badge visual primero */}
                    <span className="text-2xl">
                      {entry.level === 'infierno' && '💀🔥'}
                      {entry.level === 'llamarada' && '🔥🔥'}
                      {entry.level === 'chispa' && '🔥'}
                    </span>
                    {/* Wallet + nivel en texto */}
                    <div>
                      <span className="font-mono text-sm font-medium">
                        {shortenAddress(entry.address)}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {entry.level.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        • {entry.burnCount}x
                      </span>
                    </div>
                  </div>
                </td>
                <td className="text-right">
                  <span className="font-bold text-lg">
                    {formatBurned(entry.totalBurned)}
                  </span>
                  <span className="text-sm font-normal text-gray-600 ml-1">
                    DOGGY
                  </span>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>

        {leaderboard.length > 0 && (
          <div className="p-4 border-t-2 border-gray-300 bg-white">
            <p className="text-center text-xs text-gray-600 text-meme">
              💡 Niveles: CHISPA (&lt;100K) • LLAMARADA (100K-1M) • INFIERNO (&gt;1M)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
