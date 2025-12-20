'use client';

import { useEffect, useState } from 'react';
import { BurnerStats } from '@/lib/types';

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
      case 'oro': return 'badge badge-oro';
      case 'plata': return 'badge badge-plata';
      case 'bronce': return 'badge badge-bronce';
      default: return 'badge badge-bronce';
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

  // La API devuelve valores en tokens (ej: 200000 = 200K DOGGY)
  const formatBurned = (tokens: number): string => {
    if (tokens >= 1_000_000) {
      return `${(tokens / 1_000_000).toFixed(2)}M`;
    }
    if (tokens >= 1_000) {
      return `${(tokens / 1_000).toFixed(1)}K`;
    }
    return tokens.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  if (loading) {
    return (
      <div className="window-98 window-98-tie">
        <div className="window-titlebar">
          <span>🏆 Top Quemadores</span>
          <span>—  ▢  ✕</span>
        </div>
        <div className="window-content">
          <p className="text-center text-meme py-8">Cargando competidores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="panel-burnt text-center py-8">
        <p className="text-meme-bold text-fire">❌ Error al cargar el ranking</p>
        <p className="text-meme text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className="window-98 window-98-tie">
        <div className="window-titlebar">
          <span>🏆 Top Quemadores</span>
          <span>—  ▢  ✕</span>
        </div>
        <div className="window-content text-center py-8">
          <p className="text-meme-bold">No hay competidores todavía</p>
          <p className="text-meme text-sm mt-2">Sé el primero en quemar 🔥</p>
        </div>
      </div>
    );
  }

  return (
    <div className="window-98 window-98-tie">
      <div className="window-titlebar">
        <span>🏆 Top Quemadores - Los que se atreven</span>
        <span>—  ▢  ✕</span>
      </div>
      <div className="window-content p-0">
        
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="table-leaderboard">
            <thead>
              <tr>
                <th className="w-16">#</th>
                <th>Quemador</th>
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
                        {/* Badge más grande */}
                        {entry.hasBadge ? (
                          <div className="badge-display">
                            <img 
                              src={`/nfts/${entry.level}.png`}
                              alt={entry.level}
                              className="w-16 h-16 rounded-md shadow-sm border-2 border-gray-300"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-md border-2 border-gray-200">
                            <span className="text-xs text-gray-400">Sin<br/>badge</span>
                          </div>
                        )}
                        {/* Wallet */}
                        <div>
                          <span className="font-mono text-sm font-medium">
                            {shortenAddress(entry.address)}
                          </span>
                          <span className="text-xs text-gray-400 ml-2">
                            • {entry.burnCount}x quemas
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
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4">
          {leaderboard.map((entry, index) => (
            <div key={entry.address} className="leaderboard-card">
              <div className="card-header">
                <div className="rank-badge">
                  {getMedal(index + 1) || `#${index + 1}`}
                </div>
                {entry.hasBadge && (
                  <img 
                    src={`/nfts/${entry.level}.png`}
                    alt={entry.level}
                    className="badge-mobile"
                  />
                )}
              </div>
              
              <div className="card-body">
                <div className="wallet-mobile">
                  {shortenAddress(entry.address)}
                </div>
                <div className="stats-mobile">
                  <span className="burned-amount">
                    {formatBurned(entry.totalBurned)} DOGGY
                  </span>
                  <span className="burn-count">
                    {entry.burnCount} quemas
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
