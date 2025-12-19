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
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 
      !process.env.GOOGLE_PRIVATE_KEY || 
      !process.env.GOOGLE_SHEET_ID) {
    throw new Error('Google Sheets credentials not configured');
  }

  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  
  return doc;
}

/**
 * Guarda un badge claim en Google Sheets
 */
export async function saveBadgeClaim(badge: BadgeRecord): Promise<boolean> {
  try {
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

    // Verificar si ya existe
    const rows = await badgesSheet.getRows();
    const existing = rows.find((row: any) => 
      row.get('Wallet')?.toLowerCase() === badge.wallet.toLowerCase()
    );

    if (existing) {
      // Actualizar existente (si quemó más)
      existing.set('Level', badge.level);
      existing.set('Total Burned', badge.totalBurned);
      existing.set('Signature', badge.signature);
      existing.set('Claimed At', badge.claimedAt);
      await existing.save();
    } else {
      // Crear nuevo
      await badgesSheet.addRow({
        'Wallet': badge.wallet,
        'Level': badge.level,
        'Total Burned': badge.totalBurned,
        'Signature': badge.signature,
        'Claimed At': badge.claimedAt,
      });
    }

    return true;
  } catch (error) {
    console.error('Error saving badge to Sheets:', error);
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
    const doc = await getSheet();
    const badgesSheet = doc.sheetsByTitle['Badges'];
    
    if (!badgesSheet) {
      return [];
    }

    const rows = await badgesSheet.getRows();
    
    return rows.map((row: any) => ({
      wallet: row.get('Wallet'),
      level: row.get('Level'),
      totalBurned: parseFloat(row.get('Total Burned') || '0'),
      signature: row.get('Signature'),
      claimedAt: row.get('Claimed At'),
    }));
  } catch (error) {
    console.error('Error getting badge holders:', error);
    return [];
  }
}
