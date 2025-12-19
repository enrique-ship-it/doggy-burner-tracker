'use client';

import { useState } from 'react';

interface WalletStats {
  address: string;
  totalBurned: number;
  burnCount: number;
  level: string;
  rank?: number;
}

export function WalletLookup() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<WalletStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async () => {
    if (!address.trim()) {
      setError('Ingresa una dirección de wallet');
      return;
    }

    setLoading(true);
    setError(null);
    setStats(null);

    try {
      const res = await fetch('/api/burns');
      if (!res.ok) throw new Error('Error al cargar datos');
      
      const data = await res.json();
      
      // Buscar la wallet en el leaderboard
      const walletData = data.leaderboard.find(
        (entry: any) => entry.address.toLowerCase() === address.trim().toLowerCase()
      );

      if (walletData) {
        // Encontrar el rank
        const rank = data.leaderboard.findIndex(
          (entry: any) => entry.address.toLowerCase() === address.trim().toLowerCase()
        ) + 1;

        setStats({
          address: walletData.address,
          totalBurned: walletData.totalBurned,
          burnCount: walletData.burnCount,
          level: walletData.level,
          rank
        });
      } else {
        setError('Esta wallet no ha quemado DOGGY todavía');
      }
    } catch (err) {
      setError('Error al buscar wallet');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level.toLowerCase()) {
      case 'infierno': return 'badge badge-infierno';
      case 'llamarada': return 'badge badge-llamarada';
      case 'chispa': return 'badge badge-chispa';
      default: return 'badge badge-chispa';
    }
  };

  const getLevelEmoji = (level: string) => {
    switch (level.toLowerCase()) {
      case 'infierno': return '💀🔥';
      case 'llamarada': return '🔥🔥';
      case 'chispa': return '🔥';
      default: return '🔥';
    }
  };

  return (
    <div className="window-98 max-w-2xl mx-auto">
      <div className="window-titlebar">
        <span>🔍 buscar.exe - Ver stats sin conectar</span>
        <span>—  ▢  ✕</span>
      </div>
      <div className="window-content">
        
        <p className="text-meme mb-4 text-center">
          Busca cualquier wallet para ver sus estadísticas de burn
          <br />
          <span className="text-xs text-gray-600">(sin necesidad de conectar)</span>
        </p>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
            placeholder="Ej: 3CsLCkKNEC9UrsycKdqo9BEPkBazgLWs52iNZbqjvXaQ"
            disabled={loading}
            autoComplete="off"
            spellCheck="false"
            className="flex-1 px-4 py-2 border-2 border-gray-400 font-mono text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
          />
          <button
            onClick={handleLookup}
            disabled={loading || !address.trim()}
            className="btn-win98 btn-navy px-6 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '🔄' : '🔍'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 border-2 border-red-500 bg-red-50 mb-4">
            <p className="text-sm text-red-800">❌ {error}</p>
          </div>
        )}

        {/* Results */}
        {stats && (
          <div className="border-t-2 border-gray-300 pt-4">
            <div className="bg-gray-50 p-4 mb-4">
              <p className="text-xs text-gray-600 mb-1">Wallet:</p>
              <p className="code-address text-xs break-all">{stats.address}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 border-2 border-gray-300">
                <p className="text-sm text-gray-600 mb-1">Rank</p>
                <p className="text-2xl font-bold text-navy">
                  {stats.rank === 1 && '🥇'}
                  {stats.rank === 2 && '🥈'}
                  {stats.rank === 3 && '🥉'}
                  {stats.rank && stats.rank > 3 && `#${stats.rank}`}
                </p>
              </div>

              <div className="text-center p-3 border-2 border-gray-300">
                <p className="text-sm text-gray-600 mb-1">Nivel</p>
                <p className={getLevelBadgeClass(stats.level)}>
                  {getLevelEmoji(stats.level)} {stats.level.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-red-50 border-2 border-red-300">
                <p className="text-sm text-gray-600 mb-1">Total Quemado</p>
                <p className="text-xl font-bold text-red-600">
                  {formatNumber(stats.totalBurned)}
                </p>
                <p className="text-xs text-gray-500 mt-1">DOGGY</p>
              </div>

              <div className="text-center p-3 bg-orange-50 border-2 border-orange-300">
                <p className="text-sm text-gray-600 mb-1">Burns Realizados</p>
                <p className="text-xl font-bold text-orange-600">
                  {stats.burnCount}
                </p>
                <p className="text-xs text-gray-500 mt-1">transacciones</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t-2 border-gray-300">
              <p className="text-xs text-center text-gray-600 text-meme">
                💡 Estos datos son públicos en la blockchain
              </p>
            </div>
          </div>
        )}

        {!stats && !error && !loading && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-meme">Ingresa una wallet para comenzar</p>
          </div>
        )}

      </div>
    </div>
  );
}
