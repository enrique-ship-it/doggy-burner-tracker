/**
 * Badge Tier Calculation Utilities
 * 
 * Funciones helper para calcular tiers de badges y detectar upgrades
 */

export type BadgeLevel = 'bronce' | 'plata' | 'oro';

/**
 * Calcula el tier de badge basado en la cantidad total quemada
 * @param totalBurned - Cantidad total de tokens quemados
 * @returns El nivel de badge correspondiente
 */
export function calculateCurrentTier(totalBurned: number): BadgeLevel {
  if (totalBurned >= 1_000_000) {
    return 'oro';
  } else if (totalBurned >= 100_000) {
    return 'plata';
  } else {
    return 'bronce';
  }
}

/**
 * Verifica si un usuario califica para un upgrade de badge
 * @param storedLevel - El nivel actual almacenado en Supabase
 * @param currentBurns - La cantidad actual de tokens quemados en blockchain
 * @returns Objeto con canUpgrade y el nuevo tier si aplica
 */
export function checkUpgradeEligibility(
  storedLevel: BadgeLevel,
  currentBurns: number
): { canUpgrade: boolean; newTier?: BadgeLevel } {
  const currentTier = calculateCurrentTier(currentBurns);
  
  // Mapeo de niveles a números para comparación
  const tierRank = {
    'bronce': 1,
    'plata': 2,
    'oro': 3
  };
  
  const canUpgrade = tierRank[currentTier] > tierRank[storedLevel];
  
  return {
    canUpgrade,
    newTier: canUpgrade ? currentTier : undefined
  };
}

/**
 * Obtiene el nombre display del tier en español
 * @param level - El nivel del badge
 * @returns Nombre formateado para mostrar
 */
export function getTierDisplayName(level: BadgeLevel): string {
  const names = {
    'bronce': 'BRONCE',
    'plata': 'PLATA',
    'oro': 'ORO'
  };
  return names[level];
}
