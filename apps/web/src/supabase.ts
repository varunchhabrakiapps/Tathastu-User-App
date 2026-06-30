import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ?? 'https://sfzkwrrxjcdkwxakbcdz.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'sb_publishable_FatQFY7WEibd2GGrk0-HAA_oCgDIbKo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
