import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://zggetiknhlctljmmfhbk.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnZ2V0aWtuaGxjdGxqbW1maGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMzYyNjgsImV4cCI6MjA1MzcxMjI2OH0.kNkWqW2GJOPkdxlokwrQxeF0Ee8jSQ1BetW4OKWlUv0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
