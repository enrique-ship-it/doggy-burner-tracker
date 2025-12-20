// Script para limpiar datos de test en Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanupTestData() {
  console.log('🧹 Limpiando datos de test en Supabase...\n');

  // Primero listar todos los registros
  const { data: allClaims, error: listError } = await supabase
    .from('badge_claims')
    .select('*')
    .order('created_at', { ascending: true });

  if (listError) {
    console.error('❌ Error listando claims:', listError);
    return;
  }

  console.log(`📊 Total de claims en la base: ${allClaims?.length || 0}\n`);
  
  if (allClaims && allClaims.length > 0) {
    console.log('Claims actuales:');
    allClaims.forEach((claim, i) => {
      console.log(`${i + 1}. Wallet: ${claim.wallet_address.slice(0, 8)}...`);
      console.log(`   Nivel: ${claim.level}`);
      console.log(`   Quemado: ${claim.total_burned.toLocaleString()} DOGGY`);
      console.log(`   Fecha: ${new Date(claim.created_at).toLocaleString('es-MX')}`);
      console.log('');
    });

    // Borrar el primer registro (registro de test)
    if (allClaims.length > 0) {
      const testClaim = allClaims[0];
      
      console.log(`🗑️  Borrando registro de test: ${testClaim.wallet_address.slice(0, 8)}...\n`);
      
      const { error: deleteError } = await supabase
        .from('badge_claims')
        .delete()
        .eq('id', testClaim.id);

      if (deleteError) {
        console.error('❌ Error borrando:', deleteError);
      } else {
        console.log('✅ Registro de test eliminado correctamente\n');
        
        // Verificar
        const { data: remaining } = await supabase
          .from('badge_claims')
          .select('*');
        
        console.log(`📊 Claims restantes: ${remaining?.length || 0}`);
      }
    }
  } else {
    console.log('✨ No hay datos en la tabla');
  }
}

cleanupTestData()
  .then(() => console.log('\n✅ Limpieza completada'))
  .catch(err => console.error('\n❌ Error:', err));
