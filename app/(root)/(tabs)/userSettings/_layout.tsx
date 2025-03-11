import { View, Text } from "react-native"
import React from "react"
import { Stack } from "expo-router"

const UserSettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "index" }} />
    </Stack>
  )
}

export default UserSettingsLayout
