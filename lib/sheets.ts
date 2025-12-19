// Google Sheets helper - Reutiliza conexión existente
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export interface BadgeRecord {
  wallet: string;
  level: 'bronce' | 'plata' | 'oro';
  totalBurned: number;
  signature: string;
  claimedAt: string;
}

/**
 * Obtiene el documento de Google Sheets autenticado
 */
async function getSheet() {
  console.log('[Sheets] getSheet() called');
  
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 
      !process.env.GOOGLE_PRIVATE_KEY || 
      !process.env.GOOGLE_SHEET_ID) {
    console.error('[Sheets] Missing credentials - EMAIL:', !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, 'KEY:', !!process.env.GOOGLE_PRIVATE_KEY, 'SHEET_ID:', !!process.env.GOOGLE_SHEET_ID);
    throw new Error('Google Sheets credentials not configured');
  }

  console.log('[Sheets] Credentials found');

  // El formato esperado es: "-----BEGIN PRIVATE KEY-----\nMIIE....\n-----END PRIVATE KEY-----\n"
  // Con \n literales (dos caracteres), NO saltos de línea reales
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;
  console.log('[Sheets] Raw key length:', privateKey.length);
  console.log('[Sheets] Key starts with:', privateKey.substring(0, 30));
  console.log('[Sheets] Key ends with:', privateKey.substring(privateKey.length - 30));
  
  // Reemplazar \n literales (dos caracteres) por saltos de línea reales
  privateKey = privateKey.replace(/\\n/g, '\n');
  
  console.log('[Sheets] After replacement, key starts with:', privateKey.substring(0, 30));
  console.log('[Sheets] After replacement, key ends with:', privateKey.substring(privateKey.length - 30));

  console.log('[Sheets] Creating JWT auth...');
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  console.log('[Sheets] Creating document...');
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
  
  console.log('[Sheets] Loading info...');
  try {
    await doc.loadInfo();
    console.log('[Sheets] ✅ loadInfo success!');
  } catch (error) {
    console.error('[Sheets] ❌ loadInfo failed:', error instanceof Error ? error.message : error);
    throw error;
  }
  
  return doc;
}

/**
 * Guarda un badge claim en Google Sheets
 */
export async function saveBadgeClaim(badge: BadgeRecord): Promise<boolean> {
  try {
    console.log('[Sheets] Saving badge claim for:', badge.wallet);
    const doc = await getSheet();
    
    // Debug: imprimir todos los sheets disponibles
    console.log('[Sheets] Sheets disponibles:', Object.keys(doc.sheetsByTitle));
    
    // Buscar sheet "Badges"
    const badgesSheet = doc.sheetsByTitle['Badges'];
    if (!badgesSheet) {
      console.error('[Sheets] Sheet "Badges" no encontrada.');
      console.error('[Sheets] Sheets en el documento:', Object.keys(doc.sheetsByTitle));
      return false;
    }

    console.log('[Sheets] Found Badges sheet, loading rows...');
    // Verificar si ya existe
    const rows = await badgesSheet.getRows();
    console.log(`[Sheets] Loaded ${rows.length} existing rows`);
    const existing = rows.find((row: any) => 
      row.get('Wallet')?.toLowerCase() === badge.wallet.toLowerCase()
    );

    if (existing) {
      console.log('[Sheets] Updating existing badge for:', badge.wallet);
      // Actualizar existente (si quemó más)
      existing.set('Level', badge.level);
      existing.set('Total Burned', badge.totalBurned);
      existing.set('Signature', badge.signature);
      existing.set('Claimed At', badge.claimedAt);
      await existing.save();
      console.log('[Sheets] Badge updated successfully');
    } else {
      console.log('[Sheets] Adding new badge row for:', badge.wallet);
      // Crear nuevo
      await badgesSheet.addRow({
        'Wallet': badge.wallet,
        'Level': badge.level,
        'Total Burned': badge.totalBurned,
        'Signature': badge.signature,
        'Claimed At': badge.claimedAt,
      });
      console.log('[Sheets] Badge added successfully');
    }

    return true;
  } catch (error) {
    console.error('[Sheets] ❌ ERROR saving badge to Sheets');
    console.error('[Sheets] Error object:', error);
    if (error instanceof Error) {
      console.error('[Sheets] Error message:', error.message);
      console.error('[Sheets] Error name:', error.name);
      console.error('[Sheets] Error code:', (error as any).code);
      console.error('[Sheets] Error status:', (error as any).status);
      if (error.stack) {
        console.error('[Sheets] Error stack:', error.stack.split('\n').slice(0, 5).join('\n'));
      }
    } else {
      console.error('[Sheets] Error is not an Error instance:', typeof error);
    }
    return false;
  }
}

/**
 * Verifica si una wallet tiene badge
 */
export async function hasBadge(wallet: string): Promise<BadgeRecord | null> {
  try {
    const doc = await getSheet();
    const badgesSheet = doc.sheetsByTitle['Badges'];
    
    if (!badgesSheet) {
      return null;
    }

    const rows = await badgesSheet.getRows();
    const badge = rows.find((row: any) => 
      row.get('Wallet')?.toLowerCase() === wallet.toLowerCase()
    );

    if (!badge) {
      return null;
    }

    return {
      wallet: badge.get('Wallet'),
      level: badge.get('Level'),
      totalBurned: parseFloat(badge.get('Total Burned') || '0'),
      signature: badge.get('Signature'),
      claimedAt: badge.get('Claimed At'),
    };
  } catch (error) {
    console.error('Error checking badge:', error);
    return null;
  }
}

/**
 * Obtiene todos los badge holders (para whitelist)
 */
export async function getAllBadgeHolders(): Promise<BadgeRecord[]> {
  try {
    console.log('[Sheets] Getting all badge holders...');
    const doc = await getSheet();
    const badgesSheet = doc.sheetsByTitle['Badges'];
    
    if (!badgesSheet) {
      console.log('[Sheets] Badges sheet not found!');
      return [];
    }

    const rows = await badgesSheet.getRows();
    console.log(`[Sheets] Found ${rows.length} badge rows`);
    
    return rows.map((row: any) => ({
      wallet: row.get('Wallet'),
      level: row.get('Level'),
      totalBurned: parseFloat(row.get('Total Burned') || '0'),
      signature: row.get('Signature'),
      claimedAt: row.get('Claimed At'),
    }));
  } catch (error) {
    console.error('[Sheets] Error getting badge holders:', error);
    return [];
  }
}
