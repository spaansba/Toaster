import { useAuth } from "@/providers/AuthProvider"
import { router, Stack } from "expo-router"
import React from "react"

export default function AuthLayout() {
  const { session, isLoading } = useAuth()
  if (isLoading) {
    return null // or a loading spinner
  }

  if (session) {
    router.replace("/")
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
