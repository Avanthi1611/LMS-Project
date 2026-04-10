import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kshhvegzovzdgclaqcrc.supabase.co'; 
const supabaseAnonKey = 'sb_publishable_WIynBCVnLjkAE3jasY_Tng_ZK1h23wK'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);