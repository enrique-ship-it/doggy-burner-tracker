import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BadgeRecord {
  wallet: string;
  level: 'bronce' | 'plata' | 'oro';
  totalBurned: number;
  signature: string;
  claimedAt: string;
}

/**
 * Guarda un badge claim en Supabase
 */
export async function saveBadgeClaim(badge: BadgeRecord): Promise<boolean> {
  try {
    console.log('[Supabase] Saving badge claim for:', badge.wallet);

    // Verificar si ya existe
    const { data: existing, error: selectError } = await supabase
      .from('badge_claims')
      .select('*')
      .eq('wallet', badge.wallet.toLowerCase())
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116 = no rows found (esto es ok)
      console.error('[Supabase] Error checking existing:', selectError);
      throw selectError;
    }

    if (existing) {
      console.log('[Supabase] Updating existing badge for:', badge.wallet);
      const { error: updateError } = await supabase
        .from('badge_claims')
        .update({
          level: badge.level,
          total_burned: badge.totalBurned,
          signature: badge.signature,
          claimed_at: badge.claimedAt,
        })
        .eq('wallet', badge.wallet.toLowerCase());

      if (updateError) {
        console.error('[Supabase] Error updating:', updateError);
        throw updateError;
      }
      console.log('[Supabase] ✅ Badge updated successfully');
    } else {
      console.log('[Supabase] Creating new badge claim for:', badge.wallet);
      const { error: insertError } = await supabase
        .from('badge_claims')
        .insert({
          wallet: badge.wallet.toLowerCase(),
          level: badge.level,
          total_burned: badge.totalBurned,
          signature: badge.signature,
          claimed_at: badge.claimedAt,
        });

      if (insertError) {
        console.error('[Supabase] Error inserting:', insertError);
        throw insertError;
      }
      console.log('[Supabase] ✅ Badge created successfully');
    }

    return true;
  } catch (error) {
    console.error('[Supabase] ❌ ERROR saving badge:', error);
    return false;
  }
}

/**
 * Obtiene todos los badges reclamados
 */
export async function getAllBadgeHolders(): Promise<BadgeRecord[]> {
  try {
    console.log('[Supabase] Fetching all badge holders...');

    const { data, error } = await supabase
      .from('badge_claims')
      .select('*');

    if (error) {
      console.error('[Supabase] Error fetching badges:', error);
      return [];
    }

    const badges = data.map((row: any) => ({
      wallet: row.wallet,
      level: row.level,
      totalBurned: row.total_burned,
      signature: row.signature,
      claimedAt: row.claimed_at,
    }));

    console.log('[Supabase] ✅ Fetched', badges.length, 'badge holders');
    return badges;
  } catch (error) {
    console.error('[Supabase] Error in getAllBadgeHolders:', error);
    return [];
  }
}

/**
 * Verifica si una wallet tiene badge
 */
export async function hasBadge(wallet: string): Promise<BadgeRecord | null> {
  try {
    const { data, error } = await supabase
      .from('badge_claims')
      .select('*')
      .eq('wallet', wallet.toLowerCase())
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('[Supabase] Error checking badge:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    return {
      wallet: data.wallet,
      level: data.level,
      totalBurned: data.total_burned,
      signature: data.signature,
      claimedAt: data.claimed_at,
    };
  } catch (error) {
    console.error('[Supabase] Error in hasBadge:', error);
    return null;
  }
}
