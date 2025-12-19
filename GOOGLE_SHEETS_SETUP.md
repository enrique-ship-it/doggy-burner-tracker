# 📊 Google Sheets Setup - NFT Claims Queue

## 1. Crear Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea nueva hoja: "DOGGY_NFT_Claims"
3. Agrega estos headers en la fila 1:
   ```
   timestamp | wallet | email | level | totalBurned | status | nftAddress | processedAt
   ```

## 2. Crear Service Account en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea nuevo proyecto: "doggy-burner-tracker"
3. Navega a: **APIs & Services > Credentials**
4. Click: **Create Credentials > Service Account**
5. Nombre: `doggy-nft-minter`
6. Role: **Editor** (o más restrictivo si prefieres)
7. Click **Create and Continue**
8. Click **Done**

## 3. Generar Key para Service Account

1. En la lista de Service Accounts, click en el email de tu service account
2. Tab: **Keys**
3. **Add Key > Create new key**
4. Format: **JSON**
5. Download el archivo `.json`

## 4. Compartir Sheet con Service Account

1. Abre el archivo JSON descargado
2. Copia el email del service account (ej: `doggy-nft-minter@proyecto.iam.gserviceaccount.com`)
3. En tu Google Sheet, click **Share**
4. Pega el email del service account
5. Permisos: **Editor**
6. ✅ **Desmarcar** "Notify people"
7. Click **Share**

## 5. Configurar Variables de Entorno

Del archivo JSON descargado, extrae:

```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "doggy-nft-minter@proyecto.iam.gserviceaccount.com",
  ...
}
```

Agrega a `.env.local`:

```bash
# Google Sheets
GOOGLE_SERVICE_ACCOUNT_EMAIL="doggy-nft-minter@proyecto.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...AQUÍ_TU_KEY...AAAA\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID="1abc123...xyz789"
```

**⚠️ IMPORTANTE:**
- El `GOOGLE_SHEET_ID` está en la URL: `https://docs.google.com/spreadsheets/d/{GOOGLE_SHEET_ID}/edit`
- La private key DEBE incluir `\n` literales (no saltos de línea reales)
- Mantén el archivo JSON original en lugar seguro como backup

## 6. Agregar a Vercel (Producción)

En Vercel dashboard:

1. Project Settings → Environment Variables
2. Agrega:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` (copia exactamente como está en .env.local)
   - `GOOGLE_SHEET_ID`
3. Scope: **Production** y **Preview** (opcional)
4. Redeploy para aplicar cambios

## 7. Verificar Funcionamiento

Ejecuta localmente:

```bash
npm run dev
```

1. Busca una wallet en el sitio
2. Si tiene +10K burns, solicita NFT
3. Verifica que aparezca en Google Sheet

## 📋 Formato del Sheet

Ejemplo de datos:

| timestamp | wallet | email | level | totalBurned | status | nftAddress | processedAt |
|-----------|--------|-------|-------|-------------|--------|------------|-------------|
| 2024-12-19T10:30:00Z | 3CsLC...vjXaQ | user@email.com | chispa | 50000 | ⏳ Pendiente | | |
| 2024-12-19T11:15:00Z | 7S6Xs...sC7G | | llamarada | 250000 | ✅ Completado | ABC123...XYZ | 2024-12-20T12:00:00Z |

## 🔒 Seguridad

- ✅ Service account solo tiene acceso a este sheet específico
- ✅ No se expone en frontend (solo backend usa las credenciales)
- ✅ Rate limiting en API endpoint previene spam
- ❌ **NUNCA** commitear `.env.local` o el archivo JSON al repositorio
- ✅ `.gitignore` ya incluye `.env.local`

## 🐛 Troubleshooting

**Error: "Request had insufficient authentication scopes"**
- Verifica que el service account tenga permisos de **Editor** en el sheet

**Error: "Unable to parse range"**
- Verifica que el sheet tenga los headers correctos en la fila 1

**Error: "Invalid private key"**
- Asegúrate de que los `\n` en la private key sean literales, no saltos de línea reales
- Verifica que la key esté entre comillas dobles en .env.local

**Claims no aparecen en el sheet:**
- Verifica que `GOOGLE_SHEET_ID` sea correcto (de la URL)
- Revisa logs del servidor para errores
- Verifica que el service account email esté compartido en el sheet

## 📚 Referencias

- [Google Sheets API Docs](https://developers.google.com/sheets/api)
- [Service Accounts Guide](https://cloud.google.com/iam/docs/service-accounts)
- [google-spreadsheet npm package](https://www.npmjs.com/package/google-spreadsheet)
