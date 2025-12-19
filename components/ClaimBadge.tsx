'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect } from 'react';
import nacl from 'tweetnacl';

const SIGN_MESSAGE = 'I claim my DOGGY Burner Badge';

export function ClaimBadge() {
  const { publicKey, signMessage } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [badge, setBadge] = useState<any>(null);
  const [hasBadge, setHasBadge] = useState(false);
  const [checkingBadge, setCheckingBadge] = useState(false);

  // Verificar si ya tiene badge
  useEffect(() => {
    async function checkBadge() {
      if (!publicKey) {
        setHasBadge(false);
        return;
      }

      setCheckingBadge(true);
      try {
        const res = await fetch(`/api/verify-badge?wallet=${publicKey.toString()}`);
        const data = await res.json();
        
        if (data.hasBadge) {
          setHasBadge(true);
          setBadge(data.badge);
        } else {
          setHasBadge(false);
        }
      } catch (err) {
        console.error('Error checking badge:', err);
      } finally {
        setCheckingBadge(false);
      }
    }

    checkBadge();
  }, [publicKey]);

  const handleClaimBadge = async () => {
    if (!publicKey || !signMessage) {
      setError('Conecta tu wallet primero');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Firmar mensaje
      const messageBytes = new TextEncoder().encode(SIGN_MESSAGE);
      const signatureBytes = await signMessage(messageBytes);
      const signatureHex = Buffer.from(signatureBytes).toString('hex');

      // Enviar a API
      const res = await fetch('/api/claim-badge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet: publicKey.toString(),
          signature: signatureHex,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al clamar badge');
      }

      setSuccess(true);
      setBadge(data.badge);
      setHasBadge(true);

    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="window-98 window-98-tie">
      <div className="window-titlebar">
        <span>🎖️ badge_claimer.exe</span>
        <span>—  ▢  ✕</span>
      </div>
      <div className="window-content">
        {!publicKey ? (
          <div className="text-center py-8">
            <p className="text-meme mb-4">Conecta tu wallet para clamar tu badge</p>
            <WalletMultiButton className="btn-fire" />
          </div>
        ) : (
          <div>
            {checkingBadge ? (
              <p className="text-meme text-center">Verificando badge...</p>
            ) : hasBadge ? (
              <div className="text-center py-6">
                <div className="mb-4">
                  <img 
                    src={`/nfts/${badge?.level}.png`}
                    alt={`Badge ${badge?.level}`}
                    className="w-48 h-48 mx-auto rounded-lg shadow-2xl"
                  />
                </div>
                <h3 className="text-2xl font-bold text-dollar-green mb-2">
                  The Doggy Burner {badge?.level === 'oro' ? 'ORO' : badge?.level === 'plata' ? 'PLATA' : 'BRONCE'}
                </h3>
                <p className="text-meme text-gray-600 mb-4">
                  {badge?.totalBurned.toLocaleString()} DOGGY quemados • {new Date(badge?.claimedAt).toLocaleDateString()}
                </p>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border-2 border-orange-300">
                  <p className="text-meme-bold text-orange-800 mb-1">Wallet identificada ✓</p>
                  <p className="text-sm text-gray-700">
                    Espera recompensas y beneficios futuros
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <h3 className="text-2xl font-bold text-dollar-green mb-3">
                  Reclama tu Badge
                </h3>
                <p className="text-meme mb-6 text-gray-600">
                  Firma para verificar tu wallet<br/>
                  <span className="text-sm">Sin costo • Sin transacción</span>
                </p>

                {error && (
                  <div className="panel-burnt text-fire mb-4 p-4">
                    ❌ {error}
                  </div>
                )}

                {success && (
                  <div className="panel-success text-dollar-green mb-4 p-4">
                    ✅ Badge reclamado exitosamente
                  </div>
                )}

                <button
                  onClick={handleClaimBadge}
                  disabled={loading}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
                >
                  {loading ? '⏳ Procesando...' : '🎖️ RECLAMAR BADGE'}
                </button>

                <div className="mt-6 text-left p-4 bg-gray-50 rounded border">
                  <p className="text-xs font-bold mb-2">Beneficios</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>🔥 Badge según tus burns</li>
                    <li>🎁 Acceso a recompensas futuras</li>
                    <li>✨ Whitelist para colecciones NFT</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
