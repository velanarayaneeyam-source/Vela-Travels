import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// DIAGNOSTIC LOGS (Visible in Vercel Logs)
if (!supabaseServiceRoleKey) {
  console.warn("[SUPABASE_INIT] ⚠️ SUPABASE_SERVICE_ROLE_KEY is MISSING in environment variables.");
} else {
  console.info("[SUPABASE_INIT] ✅ SUPABASE_SERVICE_ROLE_KEY detected (Length:", supabaseServiceRoleKey.length, ")");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for backend operations like secure storage uploads
export const supabaseAdmin = supabaseServiceRoleKey 
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })
  : null;

if (supabaseAdmin) {
    console.info("[SUPABASE_INIT] ✅ Supabase Admin Client initialized successfully.");
}
