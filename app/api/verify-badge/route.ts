import { NextRequest, NextResponse } from 'next/server';
import { hasBadge } from '@/lib/sheets';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get('wallet');

  if (!wallet) {
    return NextResponse.json(
      { error: 'Wallet parameter requerido' },
      { status: 400 }
    );
  }

  const badge = await hasBadge(wallet);

  if (!badge) {
    return NextResponse.json(
      { hasBadge: false },
      { status: 200 }
    );
  }

  return NextResponse.json({
    hasBadge: true,
    badge: {
      wallet: badge.wallet,
      level: badge.level,
      totalBurned: badge.totalBurned,
      claimedAt: badge.claimedAt,
    },
  });
}
