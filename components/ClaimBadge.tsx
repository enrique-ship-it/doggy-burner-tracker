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
    <div className="claim-section">
      <div className="window-titlebar" style={{background: 'linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 100%)', marginBottom: '24px', borderRadius: '8px 8px 0 0'}}>
        <span style={{color: 'var(--suit-navy)'}}>🎖️ CONSIGUE TU MEDALLA DE QUEMADOR</span>
        <span style={{color: 'var(--suit-navy)'}}>—  ▢  ✕</span>
      </div>
      
      {!publicKey ? (
        <div className="connect-prompt text-center">
          <h3 className="claim-title mb-4">
            ¿Ya quemaste DOGGY?<br/>
            <span className="claim-subtitle">Reclama tu medalla GRATIS</span>
          </h3>
          
          <div className="claim-value-props mb-6">
            <div className="value-prop">
              <span className="icon">⚡</span>
              <span>1 click, 0 fees</span>
            </div>
            <div className="value-prop">
              <span className="icon">🎁</span>
              <span>Recompensas futuras</span>
            </div>
            <div className="value-prop">
              <span className="icon">💎</span>
              <span>Acceso VIP</span>
            </div>
          </div>
          
          <p className="text-meme mb-4">
            Conecta tu wallet para verificar tus quemas
          </p>
          <WalletMultiButton className="btn-fire mx-auto" />
          <p className="security-note mt-4">
            🔒 Solo lectura. Nunca pedimos firmar transacciones.
          </p>
        </div>
      ) : (
        <div>
          {checkingBadge ? (
            <p className="text-meme text-center py-6">Verificando medalla...</p>
          ) : hasBadge ? (
            <div className="text-center py-6">
              <div className="mb-4">
                <img 
                  src={`/nfts/${badge?.level}.png`}
                  alt={`Medalla ${badge?.level}`}
                  className="w-64 h-64 mx-auto rounded-lg shadow-2xl"
                />
              </div>
              <h3 className="text-3xl font-bold text-dollar-green mb-2">
                The Doggy Burner {badge?.level === 'oro' ? 'ORO' : badge?.level === 'plata' ? 'PLATA' : 'BRONCE'}
              </h3>
              <p className="text-meme text-gray-600 mb-4 text-lg">
                {badge?.totalBurned.toLocaleString()} DOGGY quemados • {new Date(badge?.claimedAt).toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City', day: '2-digit', month: '2-digit', year: 'numeric' })}
              </p>
              
              <div className="mt-6 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border-2 border-orange-300 max-w-md mx-auto">
                <p className="text-meme-bold text-orange-800 mb-2 text-lg">Wallet identificada ✓</p>
                <p className="text-base text-gray-700">
                  Espera recompensas y beneficios futuros
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <h3 className="claim-title mb-4">
                ¿Ya quemaste DOGGY?<br/>
                <span className="claim-subtitle">Reclama tu medalla GRATIS</span>
              </h3>
              
              <div className="claim-value-props mb-6">
                <div className="value-prop">
                  <span className="icon">⚡</span>
                  <span>1 click, 0 fees</span>
                </div>
                <div className="value-prop">
                  <span className="icon">🎁</span>
                  <span>Recompensas futuras</span>
                </div>
                <div className="value-prop">
                  <span className="icon">💎</span>
                  <span>Acceso VIP</span>
                </div>
              </div>

              {error && (
                <div className="panel-burnt text-fire mb-4 p-4 rounded">
                  ❌ {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border-2 border-green-500 text-dollar-green mb-4 p-4 rounded">
                  ✅ Medalla reclamada exitosamente
                </div>
              )}

              <button
                onClick={handleClaimBadge}
                disabled={loading}
                className="btn-claim-mega"
              >
                {loading ? '⏳ Procesando...' : '🎖️ SÍ, QUIERO MI MEDALLA'}
              </button>

              <div className="trust-signals mt-6">
                <span>✓ 100% seguro</span>
                <span>✓ Gratis para siempre</span>
                <span>✓ Sin transacciones</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
