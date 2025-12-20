// Script para limpiar datos de test en Supabase
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
      const wallet = claim.wallet_address || claim.wallet || 'N/A';
      console.log(`${i + 1}. Wallet: ${wallet.slice(0, 20)}...`);
      console.log(`   Nivel: ${claim.level || 'N/A'}`);
      console.log(`   Quemado: ${claim.total_burned?.toLocaleString() || 'N/A'} DOGGY`);
      console.log(`   Fecha: ${new Date(claim.created_at).toLocaleString('es-MX')}`);
      console.log(`   ID: ${claim.id}`);
      console.log('');
    });

    // Borrar TODOS los registros (son de test)
    console.log(`🗑️  Borrando ${allClaims.length} registros de test...\n`);
    
    for (const claim of allClaims) {
      const { error: deleteError } = await supabase
        .from('badge_claims')
        .delete()
        .eq('id', claim.id);

      if (deleteError) {
        console.error(`❌ Error borrando ID ${claim.id}:`, deleteError);
      } else {
        console.log(`✅ Borrado: ID ${claim.id}`);
      }
    }
    
    // Verificar
    const { data: remaining } = await supabase
      .from('badge_claims')
      .select('*');
    
    console.log(`\n📊 Claims restantes: ${remaining?.length || 0}`);
  } else {
    console.log('✨ No hay datos en la tabla');
  }
}

cleanupTestData()
  .then(() => console.log('\n✅ Limpieza completada'))
  .catch(err => console.error('\n❌ Error:', err));
