# 📊 DOGGY Burner Tracker - Dominio & Analytics Setup

## 🌐 PARTE 1: DOMINIO PERSONALIZADO

### Opción A: Subdomain de chebtc.com (RECOMENDADO - Gratis)

**URL Final:** `https://burner.chebtc.com`

#### Paso 1: Configurar en Vercel (2 min)
1. Ve a https://vercel.com/dashboard
2. Selecciona proyecto `doggy-burner-tracker`
3. Settings → Domains
4. Click "Add Domain"
5. Escribe: `burner.chebtc.com`
6. Click "Add"

Vercel te mostrará instrucciones DNS ↓

#### Paso 2: Configurar DNS en tu proveedor (3 min)
En el panel donde gestionas **chebtc.com** (GoDaddy, Namecheap, Cloudflare, etc):

**Agregar registro CNAME:**
```
Type: CNAME
Name: burner
Value: cname.vercel-dns.com
TTL: 3600 (o automático)
```

**Ejemplo GoDaddy:**
- DNS Management → Add Record
- Type: CNAME
- Host: burner
- Points to: cname.vercel-dns.com
- Save

**Ejemplo Cloudflare:**
- DNS → Add record
- Type: CNAME
- Name: burner
- Target: cname.vercel-dns.com
- Proxy status: DNS only (⚠️ importante)
- Save

#### Paso 3: Esperar propagación (10-30 min)
- Vercel verificará automáticamente
- Cuando veas el ✓ verde en Vercel dashboard → Listo!
- Tu tracker estará en: `https://burner.chebtc.com`

#### Paso 4: Certificado SSL (Automático)
Vercel provisiona SSL gratis con Let's Encrypt. No necesitas hacer nada.

---

### Opción B: Dominio Totalmente Nuevo

**URL Final:** `https://doggyburner.com` (ejemplo)

#### Si compras dominio nuevo (~$12/año):

1. **Comprar dominio:**
   - Namecheap: https://www.namecheap.com
   - GoDaddy: https://www.godaddy.com
   - Sugerencias baratas (.xyz): ~$3/año

2. **Configurar en Vercel:**
   - Settings → Domains → Add: `doggyburner.com`
   - Vercel te da nameservers

3. **Configurar nameservers en el proveedor:**
   - DNS Management → Nameservers
   - Cambiar a custom nameservers de Vercel:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

4. **Esperar 24-48h** para propagación completa

**Nombres disponibles (verificado):**
- doggyburner.xyz (~$3/año)
- burndoggy.com (~$12/año)
- doggyleaderboard.app (~$8/año)

---

## 📊 PARTE 2: ANALYTICS (Todas GRATUITAS)

### Setup 1: Vercel Analytics (INSTANTÁNEO - 1 click)

**Qué mide:**
- Visitors (únicos)
- Pageviews
- Top Pages
- Países/Ciudades
- Referrers (de dónde vienen)
- Devices (mobile/desktop)

**Cómo activar:**

1. **Desde Vercel Dashboard:**
   - Proyecto → Analytics tab
   - Click "Enable Vercel Analytics"
   - Deploy automáticamente

2. **Desde código (opcional, para events custom):**
```bash
cd /Users/enrique/Documents/Proyectos/Solana_Contracts/doggy_burner/doggy-burner-tracker
npm install @vercel/analytics
```

Agregar a `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Limitación free tier:**
- 2,500 events/mes gratis
- Después $10/mes por 100k events

**Dashboard:** https://vercel.com/your-project/analytics

---

### Setup 2: Umami Analytics (PRIVACIDAD + Open Source)

**Ventajas:**
- 🔥 GDPR compliant (no cookie banner)
- 🔥 100% control de tus datos
- 🔥 Real-time dashboard
- 🔥 Custom events ilimitados
- 🔥 Self-hosted GRATIS

**Opción A: Deploy en Vercel (5 min - GRATIS):**

1. **Fork & Deploy:**
   - Ve a: https://vercel.com/new/clone?repository-url=https://github.com/umami-software/umami
   - Click "Deploy"
   - Espera 2 min

2. **Configurar Database (PostgreSQL gratis):**
   Vercel te pedirá una database. Opciones:
   
   - **Vercel Postgres** (gratis hasta 256MB):
     - Storage → Create Database → Postgres
     - Connect automáticamente
   
   - **Supabase** (gratis hasta 500MB):
     - Crear proyecto en https://supabase.com
     - Database Settings → Connection String
     - Pegar en Vercel env var: `DATABASE_URL`

3. **Crear Website en Umami:**
   - Abre tu Umami: `https://tu-umami.vercel.app`
   - Login: admin / umami
   - **⚠️ CAMBIA PASSWORD:**
     - Settings → Profile → Change Password
   - Add Website:
     - Name: DOGGY Burner Tracker
     - Domain: burner.chebtc.com
     - Copy el Website ID

4. **Agregar a tu tracker:**
   - En Vercel dashboard del tracker:
   - Settings → Environment Variables:
   ```
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=el-id-que-copiaste
   NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://tu-umami.vercel.app/script.js
   ```
   - Redeploy

**Opción B: Umami Cloud (más simple - GRATIS hasta 100k pageviews):**

1. Crear cuenta: https://cloud.umami.is
2. Add website → DOGGY Burner Tracker
3. Copy tracking code
4. En Vercel env vars:
```
NEXT_PUBLIC_UMAMI_WEBSITE_ID=tu-website-id
NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
```

**Dashboard Umami:**
- Real-time visitors
- Pages más visitadas
- Events custom (burns, NFT mints, etc)
- Paths (user journey)
- Countries/Browsers/OS
- Exportar data a CSV

---

### Setup 3: Custom Events (YA IMPLEMENTADO)

Ya agregué tracking automático de:
- ✅ `donate_wallet_copied` - Cuando copian tu wallet
- ✅ `burn_address_copied` - Cuando copian dirección de burn
- ✅ `wallet_connected` - Cuando conectan wallet
- ✅ `burn_initiated` - Cuando inician burn
- ✅ `nft_mint_completed` - Cuando mintean NFT

**Cómo ver estos eventos:**

**En Umami:**
- Dashboard → Events
- Verás lista de todos los eventos custom
- Puedes hacer reports por evento

**Agregar más tracking (ejemplo):**
```tsx
import { trackEvent } from '@/lib/analytics';

// En cualquier componente:
const handleAction = () => {
  trackEvent('mi_evento_custom', { 
    extra_data: 'valor' 
  });
};
```

---

## 🎯 PARTE 3: DASHBOARDS QUE VERÁS

### Vercel Analytics Dashboard

```
📊 Overview (Last 7 days)
┌─────────────────────────────────┐
│ Unique Visitors      234        │
│ Total Pageviews     1,245       │
│ Avg Time on Site    3m 24s      │
└─────────────────────────────────┘

📍 Top Countries
1. 🇲🇽 Mexico         45%
2. 🇺🇸 United States  30%
3. 🇦🇷 Argentina      15%

🔗 Top Referrers
1. twitter.com        120 visits
2. Direct             80 visits
3. discord.com        34 visits

📱 Devices
Desktop: 65%
Mobile:  30%
Tablet:   5%
```

### Umami Dashboard

```
🔴 LIVE: 12 visitors ahora mismo

📊 Today
Pageviews:    456
Visitors:     123
Bounce rate:  35%
Avg visit:    2m 15s

📄 Top Pages
/                        234 views
/#leaderboard           89 views
/#burn                  67 views

⚡ Events (Custom)
donate_wallet_copied    23
burn_address_copied     156
nft_mint_completed      5
wallet_connected        98
```

---

## 🚀 CHECKLIST FINAL

### Dominio:
- [ ] Decidir: subdomain de chebtc.com vs dominio nuevo
- [ ] Agregar dominio en Vercel
- [ ] Configurar DNS (CNAME)
- [ ] Esperar propagación (10-30 min)
- [ ] Verificar que funciona con HTTPS

### Analytics:
- [ ] Activar Vercel Analytics (1 click)
- [ ] Deploy Umami (opcional, 5 min)
- [ ] Agregar env vars de Umami
- [ ] Redeploy tracker
- [ ] Verificar que eventos se trackean

### Testing:
- [ ] Abrir sitio en modo incógnito
- [ ] Hacer acciones (conectar wallet, copiar address)
- [ ] Ver dashboard de Umami en 1 min (real-time)
- [ ] Ver Vercel Analytics en 1 hora (tarda un poco)

---

## 💡 RECOMENDACIÓN FINAL

**Para tu caso:**

1. **Dominio:** `burner.chebtc.com`
   - ✅ Gratis
   - ✅ Setup en 5 min
   - ✅ Aprovecha branding de chebtc.com

2. **Analytics:**
   - ✅ **Vercel Analytics** (activar YA - 1 click)
   - ✅ **Umami Cloud** (setup en 5 min - gratis 100k/mes)
   - ⏳ **Google Analytics** (NO - necesitas cookie banner + GDPR)

3. **Tracking que importa:**
   - Visitas diarias
   - De dónde vienen (Twitter, Discord, etc)
   - Qué páginas ven más (#burn, #leaderboard, #nft)
   - Cuántos copian burn address
   - Cuántos conectan wallet
   - Cuántos mintean NFT

---

## 📱 URLs después del setup:

**Tracker:** https://burner.chebtc.com
**Analytics:** https://vercel.com/tu-proyecto/analytics
**Umami:** https://tu-umami.vercel.app (o cloud.umami.is)

¿Quieres que configure el dominio ahora o prefieres hacerlo tú?
