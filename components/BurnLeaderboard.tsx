'use client';

import { useEffect, useState } from 'react';

interface BurnerStats {
  address: string;
  totalBurned: number;
  burnCount: number;
  level: 'bronce' | 'plata' | 'oro';
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
                    {/* Mostrar imagen NFT solo si reclamó badge, sino insignia de texto */}
                    {entry.hasBadge ? (
                      <img 
                        src={`/nfts/${entry.level}.png`}
                        alt={entry.level}
                        className="w-10 h-10 rounded-md shadow-sm"
                      />
                    ) : (
                      <span className={`badge-small badge-${entry.level}`}>
                        {entry.level === 'oro' ? 'ORO' : entry.level === 'plata' ? 'PLATA' : 'BRONCE'}
                      </span>
                    )}
                    {/* Wallet */}
                    <div>
                      <span className="font-mono text-sm font-medium">
                        {shortenAddress(entry.address)}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        • {entry.burnCount}x burns
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
    </div>
  );
}
