const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkBucketMetadata() {
  console.log('--- Checking Bucket Metadata (using Service Role Key) ---');
  const { data: bucket, error } = await supabase.storage.getBucket('uploads');
  if (error) {
    console.error('Error getting bucket metadata:', error);
    return;
  }
  
  console.log('Bucket "uploads" metadata:', JSON.stringify(bucket, null, 2));
  console.log(`Bucket is PUBLIC: ${bucket.public}`);
}

checkBucketMetadata();
