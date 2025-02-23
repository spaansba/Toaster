import { useAuth } from "@/providers/AuthProvider"
import { router, Stack } from "expo-router"
import React, { useEffect } from "react"

export default function AuthLayout() {
  const { session, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && session) {
      router.replace("/")
    }
  }, [session, isLoading])

  if (isLoading) {
    return null // or a loading spinner
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="email-auth" />
      <Stack.Screen name="request-reset-password" />
    </Stack>
  )
}
