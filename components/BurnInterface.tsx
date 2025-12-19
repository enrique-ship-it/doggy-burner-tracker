'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';
import { connection, DOGGY_MINT, BURN_ADDRESS, DOGGY_DECIMALS } from '@/lib/solana';

export function BurnInterface() {
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const handleBurn = async () => {
    if (!publicKey || !amount) {
      setStatus({ type: 'error', message: 'Conecta tu wallet y ingresa una cantidad' });
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setStatus({ type: 'error', message: 'Cantidad inválida' });
      return;
    }

    setLoading(true);
    setStatus({ type: 'info', message: 'Preparando transacción...' });

    try {
      // Obtener token accounts
      const fromTokenAccount = await getAssociatedTokenAddress(
        DOGGY_MINT,
        publicKey
      );

      const toTokenAccount = await getAssociatedTokenAddress(
        DOGGY_MINT,
        BURN_ADDRESS
      );

      // Crear instrucción de transfer
      const amountInSmallestUnit = Math.floor(amountNum * Math.pow(10, DOGGY_DECIMALS));
      
      const transferInstruction = createTransferInstruction(
        fromTokenAccount,
        toTokenAccount,
        publicKey,
        amountInSmallestUnit
      );

      // Crear y enviar transacción
      const transaction = new Transaction().add(transferInstruction);
      
      setStatus({ type: 'info', message: 'Esperando confirmación de wallet...' });
      
      const signature = await sendTransaction(transaction, connection);
      
      setStatus({ type: 'info', message: 'Confirmando en blockchain...' });
      
      await connection.confirmTransaction(signature, 'confirmed');
      
      setStatus({ 
        type: 'success', 
        message: `🔥 ¡${amountNum.toLocaleString()} DOGGY quemados! Signature: ${signature.slice(0, 8)}...` 
      });
      
      setAmount('');
      
      // Recargar stats después de 3 segundos
      setTimeout(() => {
        window.location.reload();
      }, 3000);

    } catch (error: any) {
      console.error('Error burning tokens:', error);
      setStatus({ 
        type: 'error', 
        message: `Error: ${error.message || 'Transacción fallida'}` 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="window-98 window-98-tie max-w-2xl mx-auto">
      <div className="window-titlebar">
        <span>🔥 quemar.exe - Destruye tus DOGGY</span>
        <span>—  ▢  ✕</span>
      </div>
      <div className="window-content">
        
        {/* Wallet Connection */}
        <div className="mb-6 text-center">
          {!publicKey ? (
            <div>
              <p className="text-meme mb-4">Conecta tu wallet para empezar a quemar 🔥</p>
              <WalletMultiButton className="btn-win98 btn-navy mx-auto" />
            </div>
          ) : (
            <div>
              <p className="text-meme text-sm mb-2">Wallet conectada:</p>
              <p className="code-address text-xs mb-4">
                {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-8)}
              </p>
              <WalletMultiButton className="btn-win98 btn-gold text-sm" />
            </div>
          )}
        </div>

        {/* Burn Form */}
        {publicKey && (
          <div className="border-t-2 border-gray-300 pt-6">
            <label className="block text-meme mb-2">
              ¿Cuántos DOGGY quieres quemar?
            </label>
            
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1000"
              disabled={loading}
              className="w-full px-4 py-3 border-2 border-gray-400 text-lg font-mono mb-4 focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
            />

            <button
              onClick={handleBurn}
              disabled={loading || !amount}
              className="btn-win98 btn-tie w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '🔄 Quemando...' : '🔥 QUEMAR TOKENS'}
            </button>

            {/* Status Messages */}
            {status && (
              <div className={`mt-4 p-4 border-2 ${
                status.type === 'success' ? 'border-green-500 bg-green-50' :
                status.type === 'error' ? 'border-red-500 bg-red-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <p className={`text-sm ${
                  status.type === 'success' ? 'text-green-800' :
                  status.type === 'error' ? 'text-red-800' :
                  'text-blue-800'
                }`}>
                  {status.message}
                </p>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-6 pt-6 border-t-2 border-gray-300">
              <p className="text-xs text-gray-600 text-meme">
                💡 Los tokens se enviarán a Burn111...1111 y no se pueden recuperar.
                Tu transacción aparecerá en el leaderboard en unos segundos.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
