import { NextRequest, NextResponse } from 'next/server';

// Por ahora, solo mock - implementaremos Google Sheets después
export async function POST(req: NextRequest) {
  try {
    const { wallet, email, level, totalBurned } = await req.json();
    
    // Validación básica
    if (!wallet || typeof wallet !== 'string') {
      return NextResponse.json({ error: 'Wallet inválida' }, { status: 400 });
    }
    
    if (!level || !['chispa', 'llamarada', 'infierno'].includes(level.toLowerCase())) {
      return NextResponse.json({ error: 'Nivel inválido' }, { status: 400 });
    }
    
    if (!totalBurned || totalBurned < 10000) {
      return NextResponse.json({ error: 'No califica (mínimo 10K DOGGY)' }, { status: 400 });
    }
    
    // TODO: Implementar Google Sheets
    // Por ahora solo loggeamos
    console.log('NFT Claim Request:', {
      wallet,
      email: email || 'N/A',
      level,
      totalBurned,
      timestamp: new Date().toISOString(),
    });
    
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({
      success: true,
      message: 'Solicitud recibida. NFT será enviado en 24-48h.',
    });
    
  } catch (error) {
    console.error('Error processing NFT claim:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
