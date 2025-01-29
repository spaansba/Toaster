import { supabase } from "@/lib/supabase"
import type { Session } from "@supabase/supabase-js"
import { Stack, router } from "expo-router"
import { useEffect, useState } from "react"

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setIsLoading(false)
    })

    // Listen for authentication changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setIsLoading(false)
    })

    return () => authListener.subscription?.unsubscribe()
  }, [])

  // Redirect based on auth state
  useEffect(() => {
    if (isLoading) return // Wait until we check auth status

    if (session) {
      // User is logged in - show home page
      router.replace("/home")
    } else {
      // No user - show sign in page
      router.replace("/sign-in")
    }
  }, [session, isLoading])

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="properties/[id]" options={{ headerShown: true }} />
    </Stack>
  )
}
