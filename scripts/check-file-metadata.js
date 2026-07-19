const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkFileMetadata() {
  const { data: files, error } = await supabase.storage.from('uploads').list();
  if (error) {
    console.error(error);
    return;
  }
  
  console.log('--- File Metadata in "uploads" bucket ---');
  for (const file of files) {
    console.log(`File: ${file.name}`);
    console.log(`- Created: ${file.created_at}`);
    console.log(`- Metadata: ${JSON.stringify(file.metadata, null, 2)}`);
    // Note: getPublicUrl doesn't check existence, it just constructs the string.
  }
}

checkFileMetadata();
