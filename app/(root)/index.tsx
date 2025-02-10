import { supabase } from "@/lib/supabase"
import { useAuth } from "@/providers/AuthProvider"
import type { Session } from "@supabase/supabase-js"
import { Stack, router } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator } from "react-native"

export default function RootLayout() {
  const { session, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (session) {
        router.replace("/home")
      } else {
        router.replace("/sign-in")
      }
    }
  }, [session, isLoading])

  if (isLoading) {
    return <ActivityIndicator />
  }

  return null
}
