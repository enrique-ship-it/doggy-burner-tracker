import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';
import { saveBadgeClaim } from '@/lib/supabase';
import { getServerConnection } from '@/lib/server-connection';
import { scanBurns, calculateLeaderboard } from '@/lib/scanner';

// Mensaje que el usuario debe firmar
const SIGN_MESSAGE = 'I claim my DOGGY Burner Badge';

export async function POST(req: NextRequest) {
  try {
    const { wallet, signature: signatureHex } = await req.json();

    // Validar entrada
    if (!wallet || !signatureHex) {
      return NextResponse.json(
        { error: 'Wallet y signature requeridos' },
        { status: 400 }
      );
    }

    // Validar wallet address
    let walletPubkey: PublicKey;
    try {
      walletPubkey = new PublicKey(wallet);
    } catch {
      return NextResponse.json(
        { error: 'Wallet address inválida' },
        { status: 400 }
      );
    }

    // Verificar firma
    try {
      const messageBytes = new TextEncoder().encode(SIGN_MESSAGE);
      const signatureBytes = Buffer.from(signatureHex, 'hex');
      const publicKeyBytes = walletPubkey.toBytes();

      const verified = nacl.sign.detached.verify(
        messageBytes,
        signatureBytes,
        publicKeyBytes
      );

      if (!verified) {
        return NextResponse.json(
          { error: 'Firma inválida' },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error('Error verifying signature:', error);
      return NextResponse.json(
        { error: 'Error al verificar firma' },
        { status: 500 }
      );
    }

    // Verificar burns on-chain
    const connection = getServerConnection();
    const burns = await scanBurns(1000, connection);
    const leaderboard = calculateLeaderboard(burns);
    
    const burner = leaderboard.find(
      b => b.address.toLowerCase() === wallet.toLowerCase()
    );

    if (!burner) {
      return NextResponse.json(
        { error: 'No tienes burns registrados. Quema DOGGY primero.' },
        { status: 404 }
      );
    }

    // Validar mínimo
    if (burner.totalBurned < 10000) {
      return NextResponse.json(
        { error: 'Necesitas al menos 10K DOGGY quemados' },
        { status: 400 }
      );
    }

    // Guardar en Supabase ANTES de responder
    const claimTime = new Date().toISOString();
    
    console.log('[Claim Badge] Saving badge to Supabase for:', wallet);
    const saved = await saveBadgeClaim({
      wallet: wallet,
      level: burner.level,
      totalBurned: burner.totalBurned,
      signature: signatureHex,
      claimedAt: claimTime,
    });

    if (!saved) {
      console.error('[Claim Badge] Failed to save to Supabase, but badge is claimed');
    }

    const response = {
      success: true,
      badge: {
        wallet: wallet,
        level: burner.level,
        totalBurned: burner.totalBurned,
        claimedAt: claimTime,
      },
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error in claim-badge:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
