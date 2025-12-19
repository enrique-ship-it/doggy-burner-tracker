# 🔥 DOGGY Burner Tracker - NFT Claims Processor

## 📋 Próximos Pasos para Implementación Completa

### 1. ✅ Completado
- [x] Sistema de tracking de burns funcionando
- [x] Integración con Google Sheets para queue de NFT claims
- [x] Deploy a Vercel en producción
- [x] Variables de entorno configuradas
- [x] Scripts base creados
- [x] GitHub Actions workflow configurado

### 2. 🔨 Implementar Mint de NFTs (PENDIENTE)

#### Instalar dependencias Metaplex:
```bash
npm install @metaplex-foundation/umi @metaplex-foundation/umi-bundle-defaults @metaplex-foundation/mpl-token-metadata
```

#### Implementar en `scripts/process-nft-claims.js`:

**Función `mintNFT()` real:**
```javascript
const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults');
const { createNft, mplTokenMetadata } = require('@metaplex-foundation/mpl-token-metadata');
const { keypairIdentity, generateSigner } = require('@metaplex-foundation/umi');

async function mintNFT(walletAddress, level, totalBurned) {
  // 1. Crear Umi instance
  const umi = createUmi('https://api.mainnet-beta.solana.com')
    .use(mplTokenMetadata());
  
  // 2. Cargar wallet de mint (desde private key en secrets)
  const mintWallet = umi.eddsa.createKeypairFromSecretKey(
    bs58.decode(process.env.MINT_WALLET_PRIVATE_KEY)
  );
  umi.use(keypairIdentity(mintWallet));
  
  // 3. Metadata basada en level
  const metadata = {
    bronce: {
      name: 'DOGGY Burner - Bronze',
      symbol: 'DGBURN',
      uri: 'https://doggyburner.chebtc.com/metadata/bronze.json',
      image: 'https://doggyburner.chebtc.com/nft/bronze.png'
    },
    plata: {
      name: 'DOGGY Burner - Silver',
      symbol: 'DGBURN',
      uri: 'https://doggyburner.chebtc.com/metadata/silver.json',
      image: 'https://doggyburner.chebtc.com/nft/silver.png'
    },
    oro: {
      name: 'DOGGY Burner - Gold',
      symbol: 'DGBURN',
      uri: 'https://doggyburner.chebtc.com/metadata/gold.json',
      image: 'https://doggyburner.chebtc.com/nft/gold.png'
    }
  };
  
  const nftMetadata = metadata[level];
  
  // 4. Crear NFT
  const mint = generateSigner(umi);
  
  await createNft(umi, {
    mint,
    name: nftMetadata.name,
    symbol: nftMetadata.symbol,
    uri: nftMetadata.uri,
    sellerFeeBasisPoints: 0,
    creators: [{ address: mintWallet.publicKey, verified: true, share: 100 }],
    collection: null,
    uses: null,
  }).sendAndConfirm(umi);
  
  // 5. Transferir a wallet del usuario
  // TODO: Implementar transferencia
  
  return {
    success: true,
    mintAddress: mint.publicKey.toString(),
    transactionSignature: 'implementar'
  };
}
```

**Función `verifyBurns()` real:**
```javascript
async function verifyBurns(walletAddress) {
  const url = `https://api.helius.xyz/v0/addresses/${BURN_ADDRESS}/transactions?api-key=${HELIUS_API_KEY}`;
  
  const response = await fetch(url);
  const transactions = await response.json();
  
  let totalBurned = 0;
  
  for (const tx of transactions) {
    if (!tx.tokenTransfers) continue;
    
    for (const transfer of tx.tokenTransfers) {
      if (
        transfer.mint === DOGGY_MINT &&
        transfer.fromUserAccount === walletAddress &&
        transfer.toUserAccount === BURN_ADDRESS
      ) {
        totalBurned += transfer.tokenAmount;
      }
    }
  }
  
  // Determinar level
  let level = 'bronce';
  if (totalBurned >= 1_000_000) level = 'oro';
  else if (totalBurned >= 100_000) level = 'plata';
  
  return {
    verified: totalBurned >= 10000,
    totalBurned,
    level,
    burnCount: transactions.length
  };
}
```

### 3. 🎨 Crear Assets de NFT

#### Estructura necesaria:
```
doggy-burner-tracker/
├── public/
│   ├── nft/
│   │   ├── bronze.png
│   │   ├── silver.png
│   │   └── gold.png
│   └── metadata/
│       ├── bronze.json
│       ├── silver.json
│       └── gold.json
```

#### Ejemplo `bronze.json`:
```json
{
  "name": "DOGGY Burner - Bronze",
  "symbol": "DGBURN",
  "description": "Este NFT certifica que has quemado más de 10,000 DOGGY tokens, contribuyendo a la deflación del supply.",
  "image": "https://doggyburner.chebtc.com/nft/bronze.png",
  "attributes": [
    {
      "trait_type": "Tier",
      "value": "Bronze"
    },
    {
      "trait_type": "Minimum Burned",
      "value": "10,000 DOGGY"
    }
  ],
  "properties": {
    "category": "image",
    "creators": [
      {
        "address": "TU_WALLET_AQUI",
        "share": 100
      }
    ]
  }
}
```

### 4. 🔐 Configurar Secrets en GitHub

Ve a: Settings → Secrets and variables → Actions → New repository secret

Agregar:
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_SHEET_ID`
- `HELIUS_API_KEY`
- `MINT_WALLET_PRIVATE_KEY` (nueva - wallet para mintear NFTs)

### 5. 🧪 Testing

```bash
# Test local (con .env.local)
node scripts/process-nft-claims.js

# Test en GitHub Actions
# Ir a Actions → Process NFT Claims → Run workflow
```

### 6. 📊 Monitoreo

- Revisar Google Sheet diariamente
- Logs en GitHub Actions
- Alertas si más de X claims pendientes
- Budget SOL para minting

### 7. 🚀 Mejoras Futuras

- [ ] Email notifications cuando NFT se mintea
- [ ] Admin dashboard para aprobar/rechazar claims manualmente
- [ ] Batch minting para reducir costos
- [ ] Vista "Check My Claim Status" para usuarios
- [ ] Rate limiting por wallet (1 claim cada 30 días)
- [ ] Diferentes diseños de NFT según total quemado

## 📝 Notas Importantes

1. **Costos de Minting**: Cada NFT cuesta ~0.02 SOL (~$4 USD). Presupuestar accordingly.

2. **Private Key Security**: NUNCA commitear private keys. Solo en secrets.

3. **Google Sheets como Queue**: 
   - ✅ Fácil de implementar
   - ✅ Visible para debugging
   - ❌ No es escalable para miles de claims
   - Consider migrar a DB cuando crezca

4. **Helius API Limits**: Free tier = 100 req/min. Monitorear uso.

## 🔗 Enlaces Importantes

- **Producción**: https://doggyburner.chebtc.com
- **Google Sheet**: https://docs.google.com/spreadsheets/d/1HRS04L0SJmQ7JbYSZMy5NfBGtO9bmK6j6KU2uOfvn40
- **Vercel Dashboard**: https://vercel.com/enrique-ship-its-projects/doggy-burner-tracker

## ✨ Estado Actual

**Sistema de Tracking**: ✅ 100% Funcional
- Scanner detecta burns correctamente
- Display muestra 2.21M, 200K formatos correctos
- Leaderboard y recent burns funcionando

**NFT Claims System**: ⚙️ 80% Completo
- ✅ Formulario frontend
- ✅ API endpoint validando
- ✅ Google Sheets queue
- ⏳ Minting (pendiente implementación)
- ⏳ Assets NFT (pendiente diseño)

**Deploy**: ✅ En Producción
- Vercel: https://doggyburner.chebtc.com
- Variables configuradas
- GitHub Actions listo

---

**Siguiente sesión**: Implementar mint real + crear assets NFT + testing completo
