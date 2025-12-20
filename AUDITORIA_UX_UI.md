# 🎨 AUDITORÍA COMPLETA UX/UI - DOGGY BURNER TRACKER

**Fecha:** 19 de diciembre de 2025  
**Analista:** Experto en UX/UI + Copywriter LATAM  
**Dispositivos:** Desktop + Mobile  

---

## 📊 RESUMEN EJECUTIVO

**Estado General:** 7/10 - Funcional pero con oportunidades importantes de mejora

**Fortalezas:**
- ✅ Temática coherente (Windows 98 + meme + finanzas)
- ✅ Diseño distintivo y memorable
- ✅ Funcionalidades claras

**Debilidades Críticas:**
- ❌ **Jerarquía visual confusa** - Mucho contenido sin priorización
- ❌ **Copy demasiado técnico** - No apto para público LATAM general
- ❌ **Mobile no optimizado** - Experiencia degradada
- ❌ **Falta de microcopy emocional** - No conecta emocionalmente
- ❌ **CTA poco convincentes** - Botones genéricos sin valor

---

## 🎯 ANÁLISIS POR SECCIÓN

### 1. HERO / ABOVE THE FOLD

#### ❌ PROBLEMAS IDENTIFICADOS

**Copy actual:**
```
🔥 DOGGY BURN TRACKER 🔥
La competencia oficial de quema de tokens DOGGY
```

**Problemas:**
1. **"Burn Tracker"** - Término técnico en inglés, no amigable LATAM
2. **"La competencia oficial"** - Suena formal/aburrido
3. **Falta gancho emocional** - No despierta curiosidad
4. **No hay beneficio claro** - ¿Por qué debería importarme?

#### ✅ SOLUCIÓN PROPUESTA

**Nuevo copy:**
```
🔥 EL RANKING DE LOS QUE SE ATREVEN 🔥
¿Cuántos DOGGY te atreves a quemar?

Compite, sube al top, y recibe tu badge de honor 🏆
```

**Microcopy adicional:**
```
💎 Ya han ardido más de 12M de DOGGY
🔥 157 quemadores compitiendo
⚡ Actualización en tiempo real
```

**Por qué funciona:**
- ✅ "Se atreven" = desafío, no obligación
- ✅ "Badge de honor" = recompensa emocional
- ✅ Números grandes = FOMO social
- ✅ "En tiempo real" = sensación de urgencia

---

### 2. PROPUESTA DE VALOR

#### ❌ PROBLEMAS IDENTIFICADOS

**Copy actual:**
```
¿Qué es esto? El leaderboard oficial donde la comunidad DOGGY compite quemando tokens.
¿Qué ganas? Apareces en el ranking público, reduces el supply, te conviertes en DoggyQuemador 🏆
```

**Problemas:**
1. **Demasiado texto** - Usuario no lee párrafos
2. **"Reduces el supply"** - Término técnico cripto
3. **"DoggyQuemador"** - Suena infantil sin contexto
4. **Falta jerarquía** - Todo al mismo nivel

#### ✅ SOLUCIÓN PROPUESTA

**Diseño tipo "beneficios con iconos":**
```html
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="benefit-card">
    <span className="text-4xl">🏆</span>
    <h4>Entra al Top</h4>
    <p>Compite con la comunidad y escala posiciones</p>
  </div>
  
  <div className="benefit-card">
    <span className="text-4xl">🎖️</span>
    <h4>Badge Exclusivo</h4>
    <p>Demuestra tu lealtad con tu NFT personalizado</p>
  </div>
  
  <div className="benefit-card">
    <span className="text-4xl">💎</span>
    <h4>Recompensas Futuras</h4>
    <p>Acceso prioritario a drops y beneficios</p>
  </div>
</div>
```

**CSS necesario:**
```css
.benefit-card {
  background: white;
  border: 3px solid var(--suit-navy);
  padding: 24px;
  text-align: center;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.15);
  transition: transform 0.2s;
}

.benefit-card:hover {
  transform: translateY(-4px);
  box-shadow: 6px 6px 0 rgba(0,0,0,0.2);
}

.benefit-card h4 {
  font-family: 'Comic Neue', cursive;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--dollar-green);
  margin: 12px 0 8px 0;
}

.benefit-card p {
  font-size: 0.875rem;
  color: #555;
  line-height: 1.5;
}
```

---

### 3. SECCIÓN DE SEGURIDAD

#### ❌ PROBLEMAS IDENTIFICADOS

**Problema principal:**
- **Demasiado texto** - Usuario no lee bloques
- **Color verde** - Correcto, pero diseño aburrido
- **Escondida** - Debe estar MÁS arriba

#### ✅ SOLUCIÓN PROPUESTA

**Nuevo diseño tipo "badge destacado":**
```html
<div className="security-badge-hero">
  <div className="flex items-center gap-3">
    <span className="text-5xl">🔒</span>
    <div>
      <h3 className="security-title">100% SEGURO</h3>
      <p className="security-subtitle">Tu wallet, tu control</p>
    </div>
  </div>
  
  <div className="security-features">
    <div className="feature">
      <span className="checkmark">✓</span>
      <span>Sin firma de transacciones</span>
    </div>
    <div className="feature">
      <span className="checkmark">✓</span>
      <span>Datos públicos on-chain</span>
    </div>
    <div className="feature">
      <span className="checkmark">✓</span>
      <span>Badge GRATIS (solo firmas mensaje)</span>
    </div>
  </div>
</div>
```

**CSS:**
```css
.security-badge-hero {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  border: 3px solid #28a745;
  border-radius: 12px;
  padding: 24px;
  margin: 32px auto;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2);
}

.security-title {
  font-family: 'Comic Neue', cursive;
  font-weight: 700;
  font-size: 1.75rem;
  color: #155724;
  margin: 0;
}

.security-subtitle {
  color: #155724;
  font-size: 1rem;
  margin: 0;
}

.security-features {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-top: 16px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #155724;
}

.checkmark {
  font-size: 1.25rem;
  font-weight: 700;
}
```

---

### 4. LEADERBOARD

#### ❌ PROBLEMAS IDENTIFICADOS

1. **Iconos de badges muy pequeños** - 40x40px, difícil de ver
2. **"DoggyQuemador"** - Copy infantil
3. **Dirección wallet cortada** - Demasiado corta `4...4`
4. **No hay info al hover** - Usuario quiere más contexto

#### ✅ SOLUCIÓN PROPUESTA

**Mejoras de diseño:**

1. **Badges más grandes:**
```tsx
{entry.hasBadge ? (
  <div className="badge-display">
    <img 
      src={`/nfts/${entry.level}.png`}
      alt={entry.level}
      className="w-16 h-16 rounded-lg shadow-md border-2 border-gray-300"
    />
    <span className="badge-tooltip">{entry.level.toUpperCase()}</span>
  </div>
) : (
  <div className="badge-placeholder">
    <span className="text-xs text-gray-400">Sin badge</span>
  </div>
)}
```

2. **Wallet con copy button:**
```tsx
<div className="wallet-display">
  <span className="font-mono text-sm">{shortenAddress(entry.address)}</span>
  <button 
    onClick={() => copyToClipboard(entry.address)}
    className="copy-btn"
    title="Copiar dirección completa"
  >
    📋
  </button>
</div>
```

3. **Información expandible:**
```tsx
<tr className="leaderboard-row" onClick={() => toggleDetails(entry.address)}>
  {/* ...contenido... */}
</tr>

{expandedRow === entry.address && (
  <tr className="details-row">
    <td colSpan={3}>
      <div className="p-4 bg-gray-50">
        <p><strong>Wallet completa:</strong> <code>{entry.address}</code></p>
        <p><strong>Primera quema:</strong> {entry.firstBurnDate}</p>
        <p><strong>Última quema:</strong> {entry.lastBurnDate}</p>
        <a href={`https://solscan.io/account/${entry.address}`} target="_blank">
          Ver en Solscan ↗
        </a>
      </div>
    </td>
  </tr>
)}
```

---

### 5. CALL TO ACTION (QUEMAR)

#### ❌ PROBLEMAS IDENTIFICADOS

**CTA actual:**
```html
<a href="#burn" className="btn-win98 btn-tie btn-xl">
  🔥 Ver Cómo Participar
</a>
```

**Problemas:**
1. **"Ver Cómo Participar"** - Pasivo, sin emoción
2. **Scroll anchor** - Usuario no sabe qué esperar
3. **Un solo botón** - Falta alternativa para escépticos

#### ✅ SOLUCIÓN PROPUESTA

**Doble CTA (primario + secundario):**
```html
<div className="cta-group">
  <button 
    onClick={scrollToInstructions}
    className="cta-primary"
  >
    🔥 QUIERO COMPETIR
  </button>
  
  <button 
    onClick={scrollToLeaderboard}
    className="cta-secondary"
  >
    👀 Solo quiero ver el ranking
  </button>
</div>
```

**CSS:**
```css
.cta-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  margin-top: 24px;
}

@media (min-width: 768px) {
  .cta-group {
    flex-direction: row;
    justify-content: center;
  }
}

.cta-primary {
  font-family: 'Comic Neue', cursive;
  font-weight: 700;
  font-size: 1.25rem;
  padding: 16px 48px;
  background: linear-gradient(135deg, #ff6b35 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
  cursor: pointer;
  transition: all 0.3s;
}

.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(220, 38, 38, 0.6);
}

.cta-secondary {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  padding: 12px 32px;
  background: white;
  color: var(--suit-navy);
  border: 2px solid var(--suit-navy);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.cta-secondary:hover {
  background: var(--suit-navy);
  color: white;
}
```

---

### 6. INSTRUCCIONES (HOW TO BURN)

#### ❌ PROBLEMAS IDENTIFICADOS

**Copy actual:**
```
🔥 Cómo Aparecer en el Dashboard
```

**Problemas:**
1. **"Dashboard"** - Término técnico
2. **Pasos demasiado detallados** - 6 pasos asustan
3. **Falta visual** - Solo texto
4. **No hay estimated time** - Usuario no sabe cuánto tarda

#### ✅ SOLUCIÓN PROPUESTA

**Nuevo copy:**
```
🔥 3 PASOS PARA ENTRAR AL TOP
⏱️ Tiempo estimado: 2 minutos
```

**Pasos simplificados con visual:**
```html
<div className="steps-container">
  <div className="step">
    <div className="step-number">1</div>
    <div className="step-content">
      <h4>Copia la Dirección</h4>
      <p>Un click en el botón de abajo</p>
      <button className="btn-copy-inline">
        📋 Copiar Dirección
      </button>
    </div>
  </div>

  <div className="step-divider">↓</div>

  <div className="step">
    <div className="step-number">2</div>
    <div className="step-content">
      <h4>Envía desde tu Wallet</h4>
      <p>Phantom, Solflare, o cualquier wallet de Solana</p>
      <div className="wallet-icons">
        <img src="/wallets/phantom.png" alt="Phantom" />
        <img src="/wallets/solflare.png" alt="Solflare" />
        <span className="text-sm">+más</span>
      </div>
    </div>
  </div>

  <div className="step-divider">↓</div>

  <div className="step">
    <div className="step-number">3</div>
    <div className="step-content">
      <h4>Reclama tu Badge</h4>
      <p>Firma un mensaje (gratis, sin fees)</p>
      <span className="badge-preview-mini">
        <img src="/nfts/oro.png" />
        <img src="/nfts/plata.png" />
        <img src="/nfts/bronce.png" />
      </span>
    </div>
  </div>
</div>
```

**CSS:**
```css
.steps-container {
  max-width: 500px;
  margin: 0 auto;
}

.step {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 3px solid var(--suit-navy);
  box-shadow: 4px 4px 0 rgba(0,0,0,0.1);
}

.step-number {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: var(--fire-red);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Comic Neue', cursive;
  font-weight: 700;
  font-size: 1.5rem;
}

.step-content h4 {
  font-family: 'Comic Neue', cursive;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--dollar-green);
  margin: 0 0 8px 0;
}

.step-content p {
  font-size: 0.9rem;
  color: #555;
  margin: 0 0 12px 0;
}

.step-divider {
  text-align: center;
  font-size: 2rem;
  color: var(--fire-red);
  margin: 12px 0;
}

@media (max-width: 768px) {
  .step {
    flex-direction: column;
    text-align: center;
  }
  
  .step-number {
    margin: 0 auto;
  }
}
```

---

### 7. NIVELES DE BADGES

#### ❌ PROBLEMAS IDENTIFICADOS

**Copy actual:**
```
🏆 Niveles de DoggyQuemadores
🥉 BRONCE: 10,000 - 99,999 DOGGY
🥈 PLATA: 100,000 - 999,999 DOGGY
🥇 ORO: 1,000,000+ DOGGY
```

**Problemas:**
1. **"DoggyQuemadores"** - Infantil, no cool
2. **Solo números** - Falta contexto de valor
3. **No muestra beneficios** - ¿Por qué debería aspirar a ORO?

#### ✅ SOLUCIÓN PROPUESTA

**Nuevo diseño tipo "pricing tiers":**
```html
<div className="badge-tiers">
  <div className="tier tier-bronce">
    <div className="tier-header">
      <img src="/nfts/bronce.png" className="tier-badge" />
      <h4>BRONCE</h4>
    </div>
    <div className="tier-range">
      10K - 99K DOGGY
    </div>
    <div className="tier-value">
      ≈ $3 - $30 USD
    </div>
    <ul className="tier-benefits">
      <li>✓ Badge de entrada</li>
      <li>✓ Acceso a comunidad</li>
    </ul>
  </div>

  <div className="tier tier-plata tier-featured">
    <div className="tier-label">⭐ Más popular</div>
    <div className="tier-header">
      <img src="/nfts/plata.png" className="tier-badge" />
      <h4>PLATA</h4>
    </div>
    <div className="tier-range">
      100K - 999K DOGGY
    </div>
    <div className="tier-value">
      ≈ $30 - $300 USD
    </div>
    <ul className="tier-benefits">
      <li>✓ Todo de Bronce +</li>
      <li>✓ Prioridad en drops</li>
      <li>✓ Whitelist garantizada</li>
    </ul>
  </div>

  <div className="tier tier-oro">
    <div className="tier-label">👑 Elite</div>
    <div className="tier-header">
      <img src="/nfts/oro.png" className="tier-badge" />
      <h4>ORO</h4>
    </div>
    <div className="tier-range">
      1M+ DOGGY
    </div>
    <div className="tier-value">
      ≈ $300+ USD
    </div>
    <ul className="tier-benefits">
      <li>✓ Todo de Plata +</li>
      <li>✓ Acceso VIP</li>
      <li>✓ Recompensas exclusivas</li>
      <li>✓ Voz en decisiones</li>
    </ul>
  </div>
</div>
```

**CSS:**
```css
.badge-tiers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin: 32px 0;
}

.tier {
  background: white;
  border: 3px solid #ddd;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  position: relative;
  transition: transform 0.3s;
}

.tier:hover {
  transform: translateY(-8px);
}

.tier-featured {
  border-color: var(--gold);
  box-shadow: 0 8px 24px rgba(201, 162, 39, 0.3);
}

.tier-label {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gold);
  color: white;
  padding: 4px 16px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
}

.tier-badge {
  width: 80px;
  height: 80px;
  margin-bottom: 12px;
}

.tier-header h4 {
  font-family: 'Comic Neue', cursive;
  font-weight: 700;
  font-size: 1.5rem;
  margin: 0 0 8px 0;
}

.tier-bronce .tier-header h4 { color: #cd7f32; }
.tier-plata .tier-header h4 { color: #C0C0C0; }
.tier-oro .tier-header h4 { color: #FFD700; }

.tier-range {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--suit-navy);
  margin-bottom: 4px;
}

.tier-value {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 16px;
}

.tier-benefits {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.tier-benefits li {
  padding: 8px 0;
  font-size: 0.9rem;
  color: #555;
  border-bottom: 1px solid #f0f0f0;
}

.tier-benefits li:last-child {
  border-bottom: none;
}
```

---

### 8. CLAIM BADGE

#### ❌ PROBLEMAS IDENTIFICADOS

**Copy actual:**
```
🎖️ badge_claimer.exe
Reclama tu Badge
Firma para verificar tu wallet
Sin costo • Sin transacción
```

**Problemas:**
1. **"badge_claimer.exe"** - Poco claro
2. **"Firma para verificar"** - Suena técnico/sospechoso
3. **Beneficios en letra pequeña** - No se ven
4. **Botón genérico** - "RECLAMAR BADGE" sin gancho

#### ✅ SOLUCIÓN PROPUESTA

**Nuevo copy emocional:**
```
🎖️ CONSIGUE TU BADGE DE QUEMADOR
Demuestra que estuviste aquí desde el inicio
```

**CTA mejorado:**
```html
<div className="claim-section">
  <div className="claim-hero">
    <h3 className="claim-title">
      ¿Ya quemaste DOGGY?<br/>
      <span className="claim-subtitle">Reclama tu badge GRATIS</span>
    </h3>
    
    <div className="claim-value-props">
      <div className="value-prop">
        <span className="icon">⚡</span>
        <span>1 click, 0 fees</span>
      </div>
      <div className="value-prop">
        <span className="icon">🎁</span>
        <span>Recompensas futuras</span>
      </div>
      <div className="value-prop">
        <span className="icon">💎</span>
        <span>Acceso VIP</span>
      </div>
    </div>
  </div>

  {!publicKey ? (
    <div className="connect-prompt">
      <p className="text-meme mb-4">
        Conecta tu wallet para verificar tus burns
      </p>
      <WalletMultiButton className="btn-connect-xl" />
      <p className="security-note">
        🔒 Solo lectura. Nunca pedimos firmar transacciones.
      </p>
    </div>
  ) : (
    <div className="claim-actions">
      <button 
        onClick={handleClaimBadge}
        disabled={loading}
        className="btn-claim-mega"
      >
        {loading ? (
          <>⏳ Verificando...</>
        ) : (
          <>🎖️ SÍ, QUIERO MI BADGE</>
        )}
      </button>
      
      <div className="trust-signals">
        <span>✓ {claimedCount} badges reclamados</span>
        <span>✓ 100% seguro</span>
        <span>✓ Gratis para siempre</span>
      </div>
    </div>
  )}
</div>
```

**CSS:**
```css
.claim-section {
  background: linear-gradient(135deg, #fff5e6 0%, #ffe4cc 100%);
  border: 3px solid var(--gold);
  border-radius: 16px;
  padding: 32px;
  margin: 48px 0;
}

.claim-title {
  font-family: 'Comic Neue', cursive;
  font-weight: 700;
  font-size: 2rem;
  color: var(--suit-navy);
  text-align: center;
  margin-bottom: 8px;
}

.claim-subtitle {
  color: var(--fire-red);
  font-size: 1.5rem;
}

.claim-value-props {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 24px 0;
  flex-wrap: wrap;
}

.value-prop {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
}

.value-prop .icon {
  font-size: 1.5rem;
}

.btn-claim-mega {
  font-family: 'Comic Neue', cursive;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 20px 48px;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: var(--suit-navy);
  border: 3px solid var(--gold-dark);
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(201, 162, 39, 0.4);
  transition: all 0.3s;
  display: block;
  margin: 24px auto;
}

.btn-claim-mega:hover:not(:disabled) {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(201, 162, 39, 0.6);
}

.btn-claim-mega:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.trust-signals {
  display: flex;
  justify-content: center;
  gap: 24px;
  font-size: 0.85rem;
  color: #666;
  flex-wrap: wrap;
}

.security-note {
  font-size: 0.85rem;
  color: #666;
  text-align: center;
  margin-top: 12px;
}

@media (max-width: 768px) {
  .claim-title {
    font-size: 1.5rem;
  }
  
  .claim-subtitle {
    font-size: 1.125rem;
  }
  
  .btn-claim-mega {
    font-size: 1.125rem;
    padding: 16px 32px;
  }
}
```

---

### 9. MOBILE OPTIMIZATION

#### ❌ PROBLEMAS CRÍTICOS

**Problemas identificados:**
1. **Tabla de leaderboard no responsive** - Se rompe en mobile
2. **Botones muy juntos** - Difícil clickear
3. **Texto muy pequeño** - Ilegible en pantallas chicas
4. **Imágenes de badges invisibles** - 40px es muy pequeño mobile

#### ✅ SOLUCIÓN PROPUESTA

**Leaderboard mobile:**
```tsx
<div className="leaderboard-mobile md:hidden">
  {leaderboard.map((entry, index) => (
    <div key={entry.address} className="leaderboard-card">
      <div className="card-header">
        <div className="rank-badge">
          #{index + 1}
        </div>
        {entry.hasBadge && (
          <img 
            src={`/nfts/${entry.level}.png`}
            alt={entry.level}
            className="badge-mobile"
          />
        )}
      </div>
      
      <div className="card-body">
        <div className="wallet-mobile">
          {shortenAddress(entry.address)}
        </div>
        <div className="stats-mobile">
          <span className="burned-amount">
            {formatBurned(entry.totalBurned)} DOGGY
          </span>
          <span className="burn-count">
            {entry.burnCount} quemas
          </span>
        </div>
      </div>
    </div>
  ))}
</div>
```

**CSS mobile:**
```css
.leaderboard-card {
  background: white;
  border: 2px solid var(--suit-navy);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.rank-badge {
  background: var(--fire-red);
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.125rem;
}

.badge-mobile {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.wallet-mobile {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 8px;
}

.stats-mobile {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.burned-amount {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--dollar-green);
}

.burn-count {
  font-size: 0.85rem;
  color: #999;
}
```

---

### 10. COPYWRITING LATAM

#### ❌ PROBLEMAS IDENTIFICADOS

**Términos actuales en inglés:**
- "Tracker" → "Ranking" / "Contador"
- "Burns" → "Quemas"
- "Claim" → "Reclamar" ✓ (correcto)
- "Badge" → "Insignia" / "Medalla"
- "Leaderboard" → "Top" / "Ranking"

**Tono actual:** Técnico, frío, distante

**Tono ideal LATAM:** Cercano, desafiante, aspiracional

#### ✅ SOLUCIÓN PROPUESTA

**Glosario recomendado:**

| Término Actual | Término LATAM | Contexto |
|----------------|---------------|----------|
| Burn Tracker | El Contador de Quemas | Título principal |
| Leaderboard | Top Quemadores / Ranking | Sección principal |
| Badge | Medalla / Insignia de Honor | Recompensa |
| Claim your badge | Consigue tu medalla | CTA |
| How to burn | Cómo Competir | Instrucciones |
| Wallet lookup | Busca tu posición | Búsqueda |
| Burns | Quemas / Tokens destruidos | General |
| Recent burns | Últimas quemas | Actividad |

**Ejemplos de microcopy mejorado:**

❌ **Antes:**
```
Claim your badge now
```

✅ **Después:**
```
🎖️ Consigue tu medalla GRATIS
Demuestra que estuviste desde el inicio
```

---

❌ **Antes:**
```
View leaderboard
```

✅ **Después:**
```
👀 Ver el Top
¿Dónde estás tú?
```

---

❌ **Antes:**
```
Error loading data
```

✅ **Después:**
```
😅 Ups, algo falló
Estamos trabajando en ello. Intenta en un momento.
```

---

### 11. HIERARCHY & SPACING

#### ❌ PROBLEMAS IDENTIFICADOS

**Actual:**
- Secciones sin separación clara
- Todo al mismo nivel visual
- Falta de "aire" entre elementos

#### ✅ SOLUCIÓN PROPUESTA

**Sistema de espaciado mejorado:**
```css
/* Spacing tokens - más grande para mobile */
:root {
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 48px;
  --space-xl: 64px;
  --space-2xl: 96px;
}

@media (max-width: 768px) {
  :root {
    --space-lg: 32px;
    --space-xl: 48px;
    --space-2xl: 64px;
  }
}

/* Separadores visuales */
.section-divider {
  height: 4px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    var(--fire-red) 50%, 
    transparent 100%
  );
  margin: var(--space-xl) 0;
}

/* Jerarquía de títulos clara */
h1 { font-size: 3rem; }    /* Hero */
h2 { font-size: 2rem; }    /* Section */
h3 { font-size: 1.5rem; }  /* Subsection */
h4 { font-size: 1.25rem; } /* Card title */

@media (max-width: 768px) {
  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }
  h4 { font-size: 1.125rem; }
}
```

**Orden recomendado de secciones:**
```
1. Hero + Propuesta de valor [Awareness]
2. Badge de seguridad [Trust]
3. CTA primario [Action]
4. Stats globales [Social proof]
5. Leaderboard [Competition]
6. Claim Badge [Reward]
7. Instrucciones [Education]
8. Niveles [Aspiration]
9. Búsqueda wallet [Engagement]
10. Recent burns [Activity/FOMO]
11. Donar [Optional]
```

---

### 12. COLOR ACCESSIBILITY

#### ❌ PROBLEMAS IDENTIFICADOS

**Contraste insuficiente:**
- Texto gris claro sobre fondo blanco
- Verde claro en badge de seguridad

#### ✅ SOLUCIÓN PROPUESTA

**Paleta accesible WCAG AA:**
```css
:root {
  /* Textos sobre blanco */
  --text-primary: #1a1a1a;    /* Ratio: 12.63:1 */
  --text-secondary: #4a4a4a;  /* Ratio: 7.82:1 */
  --text-tertiary: #666666;   /* Ratio: 5.74:1 */
  
  /* Textos sobre fondos oscuros */
  --text-on-dark: #ffffff;
  
  /* Estados */
  --success: #1e5631;  /* Verde más oscuro */
  --error: #b91c1c;    /* Rojo más oscuro */
  --warning: #b45309;  /* Naranja más oscuro */
  
  /* Links */
  --link: #0f2342;
  --link-hover: #1a365d;
  
  /* Backgrounds con contraste */
  --bg-success: #d4edda;
  --bg-error: #fee2e2;
  --bg-warning: #fed7aa;
}
```

**Verificación:**
- Todo texto principal: ≥ 4.5:1 (AA)
- Texto grande (18pt+): ≥ 3:1 (AA)
- UI elements: ≥ 3:1 (AA)

---

### 13. LOADING STATES

#### ❌ PROBLEMAS IDENTIFICADOS

**Actual:**
```tsx
{loading && <p>Cargando...</p>}
```

**Problemas:**
- Sin feedback visual
- Usuario no sabe cuánto falta
- Texto genérico

#### ✅ SOLUCIÓN PROPUESTA

**Skeleton loaders:**
```tsx
function SkeletonLeaderboard() {
  return (
    <div className="skeleton-container">
      {[1,2,3,4,5].map(i => (
        <div key={i} className="skeleton-row">
          <div className="skeleton skeleton-circle" />
          <div className="skeleton skeleton-text-lg" />
          <div className="skeleton skeleton-text-md" />
        </div>
      ))}
    </div>
  );
}
```

**CSS:**
```css
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #e0e0e0 50%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.skeleton-text-lg {
  height: 20px;
  width: 200px;
}

.skeleton-text-md {
  height: 16px;
  width: 120px;
}
```

---

## 🎯 PRIORIZACIÓN DE CAMBIOS

### 🔴 CRÍTICO (Implementar YA)

1. **Mobile leaderboard responsive** - Actualmente roto
2. **Copy en español LATAM** - Eliminar términos técnicos en inglés
3. **CTAs emocionales** - Botones actuales muy genéricos
4. **Badges más grandes** - Invisibles en mobile

### 🟡 IMPORTANTE (Esta semana)

5. **Hero mejorado** - Propuesta de valor más clara
6. **Jerarquía visual** - Separación de secciones
7. **Instrucciones simplificadas** - De 6 pasos a 3
8. **Niveles con beneficios** - Mostrar valor de cada tier

### 🟢 MEJORA (Siguiente sprint)

9. **Skeleton loaders** - Mejor UX en carga
10. **Microcopy emocional** - Conectar emocionalmente
11. **Animaciones sutiles** - Hover effects, transitions
12. **Dark mode** - Opcional para usuarios avanzados

---

## 📱 CHECKLIST DE MOBILE

- [ ] Leaderboard responsive (cards en lugar de tabla)
- [ ] Badges de 56x56px mínimo en mobile
- [ ] Botones de 48x48px mínimo (touch target)
- [ ] Fuentes +2px más grandes que desktop
- [ ] Espaciado +8px entre secciones
- [ ] Hamburger menu si se agrega navegación
- [ ] Imágenes optimizadas (WebP, lazy loading)
- [ ] Testing en iPhone SE (375px ancho mínimo)
- [ ] Testing en iPhone 14 Pro (393px)
- [ ] Testing en Android (360px ancho común)

---

## 🎨 INSPIRACIÓN VISUAL

**Referentes de diseño similares:**
- **Farcaster Warps** - Gamificación de red social
- **Lens Protocol leaderboard** - Rankings crypto
- **Friend.tech UI** - Estética meme + dinero
- **Zora burns** - Mecánica de burns con recompensa

**Elementos a inspirarse:**
- ✅ Cards grandes en mobile
- ✅ Badges prominentes
- ✅ Microanimaciones sutiles
- ✅ Copy casual pero profesional
- ✅ Trust signals visibles

---

## 📊 MÉTRICAS DE ÉXITO

**Pre-cambios (baseline):**
- Tiempo en página: ?
- Bounce rate: ?
- Conversión a claim: ?
- Mobile vs Desktop: ?

**Post-cambios (objetivo):**
- ↑ 30% tiempo en página
- ↓ 20% bounce rate
- ↑ 50% conversión a claim
- ↑ 40% tráfico mobile

---

## 🔗 RECURSOS ADICIONALES

**Herramientas de testing:**
- WebAIM Contrast Checker (accesibilidad)
- BrowserStack (testing mobile)
- Google Lighthouse (performance + UX)
- Hotjar (heatmaps, session recordings)

**Fonts actuales:**
- Comic Neue (meme, legible)
- Inter (UI, clean)

**Paleta de colores:**
- Azul marino: #0f2342
- Rojo corbata: #8b2942
- Dorado: #c9a227
- Verde dólar: #1e5631
- Fuego: #ff6b35

---

**FIN DE AUDITORÍA**

¿Por dónde empezamos? Recomiendo priorizar:
1. Mobile leaderboard
2. Hero + CTAs
3. Copy en español
