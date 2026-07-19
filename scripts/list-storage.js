const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listFiles() {
  const { data: files, error } = await supabase.storage.from('uploads').list();
  if (error) {
    console.error('Error listing files:', error);
    return;
  }
  
  files.forEach(file => {
    console.log(`FILE: ${file.name}`);
  });
}

listFiles();
