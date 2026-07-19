const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkStorage() {
  console.log('--- Checking Supabase Storage ---');
  console.log('URL:', supabaseUrl);
  
  const { data: buckets, error } = await supabase.storage.listBuckets();
  
  if (error) {
    console.error('Error listing buckets:', error.message);
    return;
  }
  
  console.log('Buckets found:', buckets.map(b => `${b.name} (public: ${b.public})`));
  
  const uploadsBucket = buckets.find(b => b.name === 'uploads');
  if (!uploadsBucket) {
    console.error('CRITICAL: "uploads" bucket NOT FOUND!');
  } else if (!uploadsBucket.public) {
    console.warn('WARNING: "uploads" bucket is NOT public! Image URLs will not work without signed tokens.');
  } else {
    console.log('SUCCESS: "uploads" bucket exists and is public.');
  }
}

checkStorage();
