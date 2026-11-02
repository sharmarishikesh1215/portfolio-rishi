import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const env = (import.meta as any).env || {};

// Production defaults ensure the client is ALWAYS connected to Rishi's Supabase project on Vercel
const DEFAULT_SUPABASE_URL = 'https://ztarbjhythujubyhmjme.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_b_MYVf7ZlWqOhUitg2wzhg_JHpDg6Ww';

const supabaseUrl =
  import.meta.env?.VITE_SUPABASE_URL ||
  import.meta.env?.SUPABASE_URL ||
  env.VITE_SUPABASE_URL ||
  env.SUPABASE_URL ||
  DEFAULT_SUPABASE_URL;

const supabaseAnonKey =
  import.meta.env?.VITE_SUPABASE_ANON_KEY ||
  import.meta.env?.SUPABASE_ANON_KEY ||
  env.VITE_SUPABASE_ANON_KEY ||
  env.SUPABASE_ANON_KEY ||
  DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase: SupabaseClient<Database> | null = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl as string, supabaseAnonKey as string)
  : null;
