const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testBucketError() {
  const { data, error } = await supabase.storage
    .from('NONEXISTENT_BUCKET_123')
    .upload('test.txt', Buffer.from('test'), { contentType: 'text/plain' });
  
  if (error) {
    console.log('Error Message:', error.message);
    console.log('Error Status:', error.status);
    console.log('Full Error:', JSON.stringify(error, null, 2));
  }
}

testBucketError();
