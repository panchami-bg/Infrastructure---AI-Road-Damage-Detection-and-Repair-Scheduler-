// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Replace these with your actual values from Supabase
const supabaseUrl = 'https://YOUR_PROJECT_URL.supabase.co'
const supabaseKey = 'YOUR_ANON_PUBLIC_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)
