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
  const [email, setEmail] = useState('');
  const [claimStatus, setClaimStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [claimMessage, setClaimMessage] = useState('');

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

  const handleClaimNFT = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stats) return;
    
    setClaimStatus('loading');
    setClaimMessage('');
    
    try {
      const response = await fetch('/api/claim-nft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet: stats.address,
          email: email.trim() || null,
          level: stats.level,
          totalBurned: stats.totalBurned,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setClaimStatus('success');
        setClaimMessage('¡Solicitud recibida! Tu NFT será enviado en 24-48 horas.');
        setEmail('');
      } else {
        setClaimStatus('error');
        setClaimMessage(data.error || 'Error al procesar solicitud');
      }
    } catch (err) {
      setClaimStatus('error');
      setClaimMessage('Error de conexión. Intenta de nuevo.');
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
              <p className="text-xs text-center text-gray-600 text-meme mb-4">
                💡 Estos datos son públicos en la blockchain
              </p>
              
              {/* CLAIM NFT SECTION - Solo si califica */}
              {stats.totalBurned >= 10000 && (
                <div className="mt-6 pt-6 border-t-2 border-gray-300">
                  {/* SEGURIDAD DESTACADA */}
                  <div className="bg-green-50 border-2 border-green-500 p-4 rounded mb-4">
                    <p className="text-sm font-bold text-green-800 mb-2">
                      🔒 <strong>PROCESO 100% SEGURO</strong>
                    </p>
                    <ul className="text-xs text-green-700 space-y-1">
                      <li>✅ <strong>NO conectamos tu wallet</strong> - Solo verificamos on-chain</li>
                      <li>✅ <strong>NO te pedimos firma</strong> - Todo manual</li>
                      <li>✅ <strong>NFT llega directo</strong> - Sin pop-ups sospechosos</li>
                    </ul>
                  </div>
                  
                  <h4 className="text-meme-bold text-lg mb-3 text-center">
                    🎨 Reclamar NFT Conmemorativo
                  </h4>
                  
                  <p className="text-sm text-center mb-4">
                    Calificas para un NFT de nivel <strong className={getLevelBadgeClass(stats.level)}>{stats.level.toUpperCase()}</strong>
                  </p>
                  
                  {claimStatus === 'idle' && (
                    <form onSubmit={handleClaimNFT}>
                      <div className="mb-3">
                        <label className="block text-sm font-medium mb-2">
                          Email (opcional - para notificación)
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tu@email.com"
                          className="w-full px-4 py-2 border-2 border-gray-400 focus:outline-none focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Opcional. Solo para avisarte cuando llegue tu NFT.
                        </p>
                      </div>
                      
                      <button
                        type="submit"
                        className="btn-win98 btn-tie w-full text-lg py-3"
                      >
                        🎨 Solicitar Mi NFT
                      </button>
                      
                      <p className="text-xs text-center text-gray-600 mt-3 text-meme">
                        Tu NFT será enviado en 24-48 horas después de verificar tus burns on-chain
                      </p>
                    </form>
                  )}
                  
                  {claimStatus === 'loading' && (
                    <div className="text-center py-6">
                      <p className="text-meme text-lg mb-2">🔄 Procesando...</p>
                      <p className="text-sm text-gray-600">Guardando tu solicitud</p>
                    </div>
                  )}
                  
                  {claimStatus === 'success' && (
                    <div className="bg-green-50 border-2 border-green-500 p-4 rounded">
                      <p className="text-green-800 font-bold mb-2">✅ ¡Solicitud Recibida!</p>
                      <p className="text-sm text-green-700 mb-3">{claimMessage}</p>
                      <div className="bg-white p-3 rounded border border-green-300">
                        <p className="text-xs text-gray-700 mb-2">
                          <strong>Próximos pasos:</strong>
                        </p>
                        <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                          <li>Verificaremos tus burns on-chain (automático)</li>
                          <li>Mintearemos tu NFT con tus datos</li>
                          <li>Lo enviaremos a tu wallet en 24-48h</li>
                          <li>Recibirás email si lo proporcionaste</li>
                        </ol>
                      </div>
                      <p className="text-xs text-gray-500 mt-3 text-center">
                        No es necesario hacer nada más. Solo espera 🎨
                      </p>
                    </div>
                  )}
                  
                  {claimStatus === 'error' && (
                    <div className="bg-red-50 border-2 border-red-500 p-4 rounded">
                      <p className="text-red-800 font-bold mb-2">❌ Error</p>
                      <p className="text-sm text-red-700 mb-3">{claimMessage}</p>
                      <button
                        onClick={() => setClaimStatus('idle')}
                        className="btn-win98 btn-navy w-full"
                      >
                        Intentar de Nuevo
                      </button>
                    </div>
                  )}
                </div>
              )}
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
