import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Rate limiting simple (en memoria - para producción usar Redis)
const recentClaims = new Map<string, number>();
const RATE_LIMIT_MS = 60000; // 1 claim por wallet cada 60 segundos

export async function POST(req: NextRequest) {
  try {
    const { wallet, email, level, totalBurned } = await req.json();
    
    // Validación básica
    if (!wallet || typeof wallet !== 'string' || wallet.length < 32) {
      return NextResponse.json({ error: 'Wallet inválida' }, { status: 400 });
    }
    
    if (!level || !['chispa', 'llamarada', 'infierno'].includes(level.toLowerCase())) {
      return NextResponse.json({ error: 'Nivel inválido' }, { status: 400 });
    }
    
    if (!totalBurned || totalBurned < 10000) {
      return NextResponse.json({ error: 'No califica (mínimo 10K DOGGY)' }, { status: 400 });
    }
    
    // Rate limiting
    const now = Date.now();
    const lastClaim = recentClaims.get(wallet);
    if (lastClaim && now - lastClaim < RATE_LIMIT_MS) {
      const waitSeconds = Math.ceil((RATE_LIMIT_MS - (now - lastClaim)) / 1000);
      return NextResponse.json(
        { error: `Espera ${waitSeconds}s antes de intentar de nuevo` },
        { status: 429 }
      );
    }
    
    // Verificar credenciales de Google Sheets
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 
        !process.env.GOOGLE_PRIVATE_KEY || 
        !process.env.GOOGLE_SHEET_ID) {
      console.error('Google Sheets not configured');
      // En desarrollo, solo loggear sin fallar
      console.log('NFT Claim Request (dev mode):', {
        wallet,
        email: email || 'N/A',
        level,
        totalBurned,
        timestamp: new Date().toISOString(),
      });
      
      return NextResponse.json({
        success: true,
        message: 'Solicitud recibida (modo desarrollo). Configura Google Sheets para producción.',
      });
    }
    
    // Conectar a Google Sheets
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    
    // Verificar si ya existe claim para esta wallet
    const rows = await sheet.getRows();
    const existingClaim = rows.find((row: any) => 
      row.get('wallet')?.toLowerCase() === wallet.toLowerCase()
    );
    
    if (existingClaim) {
      const status = existingClaim.get('status');
      
      // Si ya fue completado o está pendiente, no permitir duplicados
      if (status === '✅ Completado') {
        return NextResponse.json({
          error: 'Ya reclamaste tu NFT anteriormente'
        }, { status: 409 });
      }
      
      if (status === '⏳ Pendiente') {
        return NextResponse.json({
          error: 'Ya tienes una solicitud pendiente. Espera 24-48h.'
        }, { status: 409 });
      }
      
      // Si fue rechazado, permitir reintentar actualizando la fila
      if (status === '❌ Rechazado - No califica') {
        existingClaim.set('timestamp', new Date().toISOString());
        existingClaim.set('email', email || '');
        existingClaim.set('level', level);
        existingClaim.set('totalBurned', totalBurned);
        existingClaim.set('status', '⏳ Pendiente');
        existingClaim.set('processedAt', '');
        await existingClaim.save();
        
        recentClaims.set(wallet, now);
        
        return NextResponse.json({
          success: true,
          message: 'Solicitud actualizada. Será procesada en 24-48h.',
        });
      }
    }
    
    // Agregar nueva solicitud
    await sheet.addRow({
      timestamp: new Date().toISOString(),
      wallet: wallet,
      email: email || '',
      level: level,
      totalBurned: totalBurned,
      status: '⏳ Pendiente',
      nftAddress: '',
      processedAt: '',
    });
    
    // Actualizar rate limit
    recentClaims.set(wallet, now);
    
    // Limpiar rate limits antiguos (cada 100 requests)
    if (recentClaims.size > 100) {
      for (const [key, time] of recentClaims.entries()) {
        if (now - time > RATE_LIMIT_MS * 2) {
          recentClaims.delete(key);
        }
      }
    }
    
    console.log('NFT Claim saved to Google Sheets:', { wallet, level });
    
    return NextResponse.json({
      success: true,
      message: 'Solicitud recibida. NFT será enviado en 24-48h.',
    });
    
  } catch (error: any) {
    console.error('Error processing NFT claim:', error);
    
    // Errores específicos de Google Sheets
    if (error.message?.includes('insufficient authentication')) {
      return NextResponse.json({
        error: 'Error de configuración del servidor. Contacta al admin.'
      }, { status: 500 });
    }
    
    return NextResponse.json(
      { error: 'Error interno del servidor. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}
