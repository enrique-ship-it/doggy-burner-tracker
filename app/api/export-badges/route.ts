import { NextRequest, NextResponse } from 'next/server';
import { getAllBadgeHolders } from '@/lib/sheets';

// API Key simple para proteger endpoint
const API_KEY = process.env.EXPORT_API_KEY || 'changeme';

export async function GET(req: NextRequest) {
  // Verificar API key
  const authHeader = req.headers.get('authorization');
  const providedKey = authHeader?.replace('Bearer ', '');

  if (providedKey !== API_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const badges = await getAllBadgeHolders();

  return NextResponse.json({
    total: badges.length,
    badges: badges.map(b => ({
      wallet: b.wallet,
      level: b.level,
      totalBurned: b.totalBurned,
      claimedAt: b.claimedAt,
    })),
  });
}
