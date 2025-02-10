import { supabase } from "@/lib/supabase"
import { useAuth } from "@/providers/AuthProvider"
import type { Session } from "@supabase/supabase-js"
import { Redirect, Stack, router } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator } from "react-native"

export default function RootLayout() {
  const { session, isLoading } = useAuth()

  if (isLoading) {
    return <ActivityIndicator />
  }

  // Instead of direct navigation, return a Redirect component
  if (session) {
    return <Redirect href="/home" />
  }
  return <Redirect href="/sign-in" />
}
