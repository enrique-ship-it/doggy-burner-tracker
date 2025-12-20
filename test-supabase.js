const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://fnxbzsqpadrbuzvufzxh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZueGJ6c3FwYWRyYnV6dnVmenhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxODc2NTMsImV4cCI6MjA4MTc2MzY1M30.Glev2WgTqtzrNHY39VyRjWZ-1akFxwVPdLLzmApEGNA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  console.log('Testing Supabase insert...');
  
  const testBadge = {
    wallet: 'test123abc',
    level: 'oro',
    total_burned: 1500000,
    signature: 'testsig123',
    claimed_at: new Date().toISOString(),
  };
  
  const { data, error } = await supabase
    .from('badge_claims')
    .insert(testBadge);
  
  console.log('Result:', { data, error });
  
  if (!error) {
    // Verificar que se guardó
    const { data: check } = await supabase
      .from('badge_claims')
      .select('*')
      .eq('wallet', 'test123abc');
    
    console.log('Verification:', check);
  }
}

testInsert();
