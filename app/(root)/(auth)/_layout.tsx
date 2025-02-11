import { Stack } from "expo-router"
import React from "react"

export default function AuthLayout() {
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
