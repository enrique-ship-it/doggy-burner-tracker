/**
 * Script para procesar claims de NFTs desde Google Sheets
 * Lee las filas con status "⏳ Pendiente" y procesa cada una:
 * 1. Verifica burns on-chain
 * 2. Mintea NFT usando Metaplex
 * 3. Transfiere NFT a la wallet del usuario
 * 4. Actualiza status en Sheet: "✅ Completado" o "❌ Rechazado"
 */

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import process from 'node:process';

// Configuración
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const HELIUS_API_KEY = process.env.HELIUS_API_KEY;

// Estados
const STATUS = {
  PENDING: '⏳ Pendiente',
  COMPLETED: '✅ Completado',
  REJECTED: '❌ Rechazado'
};

/**
 * Verifica burns on-chain para una wallet específica
 */
async function verifyBurns(walletAddress) {
  console.log(`[Verify] Checking burns for ${walletAddress}...`);
  
  // TODO: Implementar verificación real usando Helius API
  // Por ahora, retorna datos mock para testing
  
  return {
    verified: true,
    totalBurned: 10000,
    level: 'bronce',
    burnCount: 1
  };
}

/**
 * Mintea NFT usando Metaplex
 * @param {string} walletAddress - Dirección de la wallet destino
 * @param {string} level - Nivel del NFT (bronce, plata, oro)
 * @param {number} totalBurned - Total de DOGGY quemado
 */
async function mintNFT(walletAddress, level, totalBurned) {
  console.log(`[Mint] Creating ${level} NFT for ${walletAddress}...`);
  
  // TODO: Implementar mint real usando Metaplex umi
  // Pasos:
  // 1. Crear metadata basada en level
  // 2. Usar createNft() de Metaplex
  // 3. Transferir a walletAddress
  
  // Mock para testing
  const mockMintAddress = `NFT${Date.now()}mock`;
  
  return {
    success: true,
    mintAddress: mockMintAddress,
    transactionSignature: `tx${Date.now()}mock`
  };
}

/**
 * Procesa un claim individual
 */
async function processClaim(claim, rowIndex, sheet) {
  const { wallet, level, totalBurned, timestamp } = claim;
  
  console.log(`\n[Process] Claim #${rowIndex}: ${wallet}`);
  console.log(`  Level: ${level}, Burned: ${totalBurned} DOGGY`);
  
  try {
    // 1. Verificar burns on-chain
    const verification = await verifyBurns(wallet);
    
    if (!verification.verified) {
      await updateClaimStatus(sheet, rowIndex, STATUS.REJECTED, 'Burns not verified on-chain', null);
      return { success: false, reason: 'verification_failed' };
    }
    
    // 2. Mintear NFT
    const mintResult = await mintNFT(wallet, level, totalBurned);
    
    if (!mintResult.success) {
      await updateClaimStatus(sheet, rowIndex, STATUS.REJECTED, 'NFT mint failed', null);
      return { success: false, reason: 'mint_failed' };
    }
    
    // 3. Actualizar Sheet con éxito
    await updateClaimStatus(
      sheet, 
      rowIndex, 
      STATUS.COMPLETED, 
      mintResult.transactionSignature,
      mintResult.mintAddress
    );
    
    console.log(`  ✅ Completed! NFT: ${mintResult.mintAddress}`);
    
    return { 
      success: true, 
      mintAddress: mintResult.mintAddress,
      txSignature: mintResult.transactionSignature
    };
    
  } catch (error) {
    console.error(`  ❌ Error processing claim:`, error.message);
    await updateClaimStatus(sheet, rowIndex, STATUS.REJECTED, `Error: ${error.message}`, null);
    return { success: false, reason: 'error', error: error.message };
  }
}

/**
 * Actualiza el status de un claim en la Sheet
 */
async function updateClaimStatus(sheet, rowIndex, status, txSignature, nftAddress) {
  const rows = await sheet.getRows();
  const row = rows[rowIndex];
  
  row.set('status', status);
  
  if (txSignature) {
    row.set('txSignature', txSignature);
  }
  
  if (nftAddress) {
    row.set('nftAddress', nftAddress);
  }
  
  row.set('processedAt', new Date().toISOString());
  
  await row.save();
}

/**
 * Main function - Procesa todos los claims pendientes
 */
async function main() {
  console.log('🚀 Starting NFT Claims Processor...\n');
  
  // Validar configuración
  if (!SHEET_ID || !SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
    console.error('❌ Missing required environment variables:');
    console.error('  GOOGLE_SHEET_ID:', !!SHEET_ID);
    console.error('  GOOGLE_SERVICE_ACCOUNT_EMAIL:', !!SERVICE_ACCOUNT_EMAIL);
    console.error('  GOOGLE_PRIVATE_KEY:', !!PRIVATE_KEY);
    process.exit(1);
  }
  
  try {
    // Conectar a Google Sheets
    const serviceAccountAuth = new JWT({
      email: SERVICE_ACCOUNT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    console.log(`📊 Connected to Sheet: ${doc.title}`);
    
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    
    console.log(`📝 Total rows: ${rows.length}\n`);
    
    // Filtrar solo pendientes
    const pendingClaims = [];
    rows.forEach((row, index) => {
      if (row.get('status') === STATUS.PENDING) {
        pendingClaims.push({
          rowIndex: index,
          wallet: row.get('wallet'),
          email: row.get('email'),
          level: row.get('level'),
          totalBurned: parseFloat(row.get('totalBurned')),
          timestamp: row.get('timestamp')
        });
      }
    });
    
    console.log(`⏳ Pending claims: ${pendingClaims.length}`);
    
    if (pendingClaims.length === 0) {
      console.log('✨ No pending claims to process!');
      return;
    }
    
    // Procesar cada claim
    const results = {
      success: 0,
      failed: 0,
      total: pendingClaims.length
    };
    
    for (const claim of pendingClaims) {
      const result = await processClaim(claim, claim.rowIndex, sheet);
      
      if (result.success) {
        results.success++;
      } else {
        results.failed++;
      }
      
      // Esperar 2 segundos entre claims para evitar rate limits
      if (pendingClaims.indexOf(claim) < pendingClaims.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    console.log('\n📊 Processing Summary:');
    console.log(`  Total: ${results.total}`);
    console.log(`  ✅ Success: ${results.success}`);
    console.log(`  ❌ Failed: ${results.failed}`);
    console.log('\n✨ Processing complete!');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Ejecutar
main().catch(error => {
  console.error('Unhandled error:', error);
  console.error('Error details:', error.message);
  process.exit(1);
});

export { main, processClaim, verifyBurns, mintNFT };
