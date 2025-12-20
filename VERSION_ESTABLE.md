# 🎯 VERSION ESTABLE v1.0

## Estado del Proyecto: ✅ FUNCIONANDO

**URL:** https://doggyburner.chebtc.com  
**Tag de Git:** `v1.0-stable`  
**Último Deploy:** Commit `8bf691a`

---

## ✅ Funcionalidades Operativas

### 1. Tracking de Burns
- ✅ Escaneo de burns on-chain usando Helius RPC
- ✅ Leaderboard de top burners
- ✅ Estadísticas globales (total burned, total burners, etc.)
- ✅ Cache de 30 segundos para optimizar rendimiento

### 2. Sistema de Badges
- ✅ Reclamo de badges firmando con wallet (sin gas fees)
- ✅ 3 niveles: Bronce (10K-99K), Plata (100K-999K), Oro (1M+)
- ✅ Guardado en Supabase (PostgreSQL)
- ✅ Iconos de badges mostrándose en leaderboard

### 3. Verificación de NFTs
- ✅ Verificación on-chain de wallets con DOGGY Burner Club NFT
- ✅ Integración con Metaplex NFT standard

---

## 🔧 Stack Tecnológico

### Frontend
- **Framework:** Next.js 16.0.10 (App Router)
- **React:** 18
- **Wallet Adapter:** @solana/wallet-adapter-react
- **Styling:** Tailwind CSS

### Backend
- **Database:** Supabase (PostgreSQL)
- **RPC:** Helius API (mainnet)
- **Blockchain:** Solana Web3.js
- **Signature Verification:** TweetNaCl (Ed25519)

### Deploy
- **Hosting:** Vercel
- **Domain:** doggyburner.chebtc.com

---

## 🔑 Variables de Entorno (Vercel)

### Production
```
HELIUS_API_KEY=7361fd50-268e-4881-9a5c-cfc881ca4f39
NEXT_PUBLIC_SUPABASE_URL=https://fnxbzsqpadrbuzvufzxh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SOLANA_NETWORK=mainnet-beta
```

### Preview & Development
```
NEXT_PUBLIC_SUPABASE_URL=https://fnxbzsqpadrbuzvufzxh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
HELIUS_API_KEY=7361fd50-268e-4881-9a5c-cfc881ca4f39
```

---

## 📊 Supabase Configuration

**Project ID:** `fnxbzsqpadrbuzvufzxh`  
**Project URL:** https://fnxbzsqpadrbuzvufzxh.supabase.co

### Table: `badge_claims`

```sql
CREATE TABLE badge_claims (
  id BIGSERIAL PRIMARY KEY,
  wallet TEXT UNIQUE NOT NULL,
  level TEXT NOT NULL,
  total_burned BIGINT NOT NULL,
  signature TEXT NOT NULL,
  claimed_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_badge_wallet ON badge_claims(wallet);
```

### RLS Policies
```sql
-- Lectura pública
CREATE POLICY "Allow public read" ON badge_claims
  FOR SELECT USING (true);

-- Escritura pública
CREATE POLICY "Allow public insert" ON badge_claims
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON badge_claims
  FOR UPDATE WITH CHECK (true);
```

---

## 🚀 Endpoints API

### GET /api/burns
Retorna burns, leaderboard y estadísticas  
**Cache:** 30 segundos

**Response:**
```json
{
  "burns": [...],
  "leaderboard": [
    {
      "address": "wallet...",
      "totalBurned": 1500000,
      "level": "oro",
      "hasBadge": true
    }
  ],
  "stats": {
    "totalBurned": 12000000,
    "totalBurners": 45,
    "totalTransactions": 120,
    "lastUpdate": 1234567890
  }
}
```

### POST /api/claim-badge
Reclama un badge firmando mensaje

**Request:**
```json
{
  "wallet": "ABC123...",
  "signature": "deadbeef..."
}
```

**Response:**
```json
{
  "success": true,
  "badge": {
    "wallet": "ABC123...",
    "level": "oro",
    "totalBurned": 1500000,
    "claimedAt": "2025-12-19T..."
  }
}
```

### GET /api/verify-badge?wallet=ABC123...
Verifica si una wallet tiene badge

---

## 📁 Estructura de Archivos Clave

```
app/
├── api/
│   ├── burns/route.ts          # Leaderboard + stats
│   ├── claim-badge/route.ts    # Reclamo de badges
│   ├── verify-badge/route.ts   # Verificación de badges
│   └── export-badges/route.ts  # Export para admin
lib/
├── supabase.ts                 # Cliente Supabase + funciones
├── scanner.ts                  # Escaneo de burns on-chain
├── server-connection.ts        # Helius RPC connection
└── nft.ts                      # Verificación de NFTs
public/
└── nfts/
    ├── bronce.png
    ├── plata.png
    └── oro.png
```

---

## 🔄 Cómo Restaurar Esta Versión

Si algo se rompe en el futuro:

```bash
# Opción 1: Volver al tag
git checkout v1.0-stable

# Opción 2: Crear branch desde el tag
git checkout -b recovery-v1.0 v1.0-stable

# Redeploy en Vercel
vercel --prod
```

---

## ⚠️ NO TOCAR

### Variables de Entorno
- **NO** modificar `NEXT_PUBLIC_SUPABASE_ANON_KEY` sin verificar en Supabase Dashboard
- **NO** cambiar `HELIUS_API_KEY` sin probar primero

### Base de Datos
- **NO** eliminar tabla `badge_claims`
- **NO** modificar RLS policies sin testing

### Código Crítico
- **NO** modificar `lib/supabase.ts` sin backup
- **NO** cambiar lógica de `saveBadgeClaim()` 
- **NO** tocar políticas RLS en Supabase

---

## 📞 Información de Soporte

**Repositorio:** https://github.com/enrique-ship-it/doggy-burner-tracker  
**Vercel Project:** doggy-burner-tracker  
**Supabase Project:** fnxbzsqpadrbuzvufzxh

---

**Creado:** 19 de diciembre de 2025  
**Última Verificación:** ✅ Funcionando perfectamente
