const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testUpload() {
  console.log('--- Testing Restricted Upload (using Service Role Key) ---');
  const content = 'Test content ' + Date.now();
  const buffer = Buffer.from(content);
  const filename = 'test-service-upload-' + Date.now() + '.txt';

  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(filename, buffer, {
      contentType: 'text/plain',
      upsert: true
    });

  if (error) {
    console.error('SERVER-SIDE UPLOAD FAILED:', error);
  } else {
    console.log('UPLOAD SUCCESSFUL:', data);
    const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(filename);
    console.log('Public URL:', publicUrl);
  }
}

testUpload();
