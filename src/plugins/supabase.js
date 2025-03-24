import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL und Anon Key müssen in .env-Datei definiert sein')
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storageKey: 'supabase.dashboard.auth.token', // Wichtig: Identischer Storage-Key
      autoRefreshToken: true,
      persistSession: true
    }
  }
)
