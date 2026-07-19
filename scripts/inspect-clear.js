const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspectStorage() {
  console.log('--- STORAGE INSPECTION ---');
  
  // List files to see if it works
  const { data: files, error: filesError } = await supabase.storage.from('uploads').list();
  
  if (filesError) {
    console.log('❌ Error listing files in "uploads":', filesError.message, filesError.status);
    if (filesError.message === 'Bucket not found') {
       console.log('✅ CONFIRMED: THE BUCKET "uploads" DOES NOT EXIST.');
    }
  } else {
    console.log('✅ Bucket "uploads" EXISTS! Found', files.length, 'files.');
    
    // Try to upload
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('uploads')
      .upload('confirm-test.txt', Buffer.from('test'), { upsert: true });
    
    if (uploadError) {
      console.log('❌ Upload failed even if bucket exists:', uploadError.message, uploadError.status);
      console.log('🔍 TIP: Your RLS policies are likely missing for role "anon" on bucket "uploads".');
    } else {
      console.log('✅ Upload SUCCEEDED!');
    }
  }
}

inspectStorage();
