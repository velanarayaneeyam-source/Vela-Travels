const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspectStorage() {
  console.log('--- Detailed Storage Inspection ---');
  
  // Try to list buckets
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  
  if (listError) {
    console.error('Error listing buckets:', listError.message, listError.status);
  } else {
    console.log('Buckets:', JSON.stringify(buckets, null, 2));
    const uploads = buckets.find(b => b.name === 'uploads');
    if (!uploads) {
      console.log('CRITICAL: "uploads" bucket IS MISSING.');
    } else {
      console.log(`Bucket "uploads" exists. Public: ${uploads.public}`);
    }
  }

  // Try to list files in "uploads" (if it exists)
  const { data: files, error: filesError } = await supabase.storage.from('uploads').list();
  if (filesError) {
    console.log('Error listing files in "uploads":', filesError.message);
  } else {
    console.log(`Found ${files.length} files in "uploads" bucket.`);
  }
}

inspectStorage();
