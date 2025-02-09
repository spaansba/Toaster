import { supabase } from "@/lib/supabase"
import { useAuth } from "@/providers/AuthProvider"
import type { Session } from "@supabase/supabase-js"
import { Redirect, Stack, router } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator } from "react-native"

export default function RootLayout() {
  const { session, isLoading } = useAuth()
  console.log("root session", session)

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (session) {
    router.replace("/home")
  } else {
    router.replace("/sign-in")
  }
  // const [session, setSession] = useState<Session | null>(null)
  // const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   // Check if user is logged in
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session)
  //     setIsLoading(false)
  //   })

  //   // Listen for authentication changes
  // const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
  //   setSession(session)
  //   setIsLoading(false)
  // })

  //   return () => authListener.subscription?.unsubscribe()
  // }, [])

  // // Redirect based on auth state
  // useEffect(() => {
  //   if (isLoading) return // Wait until we check auth status

  //   if (session) {
  //     // User is logged in - show home page
  //     router.replace("/home")
  //   } else {
  //     // No user - show sign in page
  //     router.replace("/sign-in")
  //   }
  // }, [session, isLoading])

  return (
    <Stack>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  )
}
