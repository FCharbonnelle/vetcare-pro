import { createClient } from '@supabase/supabase-js';

// Configuration placeholders
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://mock-project-url.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key';

// Check if we are in "Mock Mode"
export const isMockMode = !process.env.EXPO_PUBLIC_SUPABASE_URL;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: !isMockMode,
    autoRefreshToken: !isMockMode,
    detectSessionInUrl: !isMockMode,
  }
});

// Mock Data for fallback
export const mockUser = {
  id: 'mock-user-id',
  email: 'alex@example.com',
  user_metadata: {
    full_name: 'Alex Johnson',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop'
  }
};
