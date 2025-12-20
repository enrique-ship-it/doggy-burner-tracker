import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { calculateCurrentTier } from '@/lib/badge-tier';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { wallet, signature } = await req.json();

    if (!wallet || !signature) {
      return NextResponse.json(
        { error: 'Wallet y firma requeridos' },
        { status: 400 }
      );
    }

    // 1. Verificar que el badge existe
    const { data: existingBadge, error: fetchError } = await supabase
      .from('badge_claims')
      .select('*')
      .eq('wallet_address', wallet)
      .single();

    if (fetchError || !existingBadge) {
      return NextResponse.json(
        { error: 'No se encontró badge para esta wallet' },
        { status: 404 }
      );
    }

    // 2. Obtener burns actuales desde blockchain
    const burnsRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/burns?wallet=${wallet}`
    );
    const burnsData = await burnsRes.json();
    const currentBurns = burnsData.totalBurned || 0;

    // 3. Calcular nuevo tier
    const newTier = calculateCurrentTier(currentBurns);

    // Verificar que realmente es un upgrade
    const tierRank = { 'bronce': 1, 'plata': 2, 'oro': 3 };
    if (tierRank[newTier] <= tierRank[existingBadge.level as 'bronce' | 'plata' | 'oro']) {
      return NextResponse.json(
        { error: 'No calificas para upgrade aún' },
        { status: 400 }
      );
    }

    // 4. Verificar firma
    const upgradeMessage = `I upgrade my DOGGY Burner Badge to ${newTier}`;
    const messageBytes = new TextEncoder().encode(upgradeMessage);
    const signatureBytes = Buffer.from(signature, 'hex');
    const publicKeyBytes = new PublicKey(wallet).toBytes();

    const isValid = nacl.sign.detached.verify(
      messageBytes,
      signatureBytes,
      publicKeyBytes
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Firma inválida' },
        { status: 401 }
      );
    }

    // 5. UPDATE en Supabase
    const { data: updatedBadge, error: updateError } = await supabase
      .from('badge_claims')
      .update({
        level: newTier,
        total_burned: currentBurns,
        updated_at: new Date().toISOString()
      })
      .eq('wallet_address', wallet)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating badge:', updateError);
      return NextResponse.json(
        { error: 'Error al actualizar badge en base de datos' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      badge: {
        wallet: updatedBadge.wallet_address,
        level: updatedBadge.level,
        totalBurned: updatedBadge.total_burned,
        claimedAt: updatedBadge.created_at,
        upgradedAt: updatedBadge.updated_at
      }
    });

  } catch (error) {
    console.error('Error in upgrade-badge:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
