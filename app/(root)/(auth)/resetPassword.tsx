import { View, Text } from "react-native"
import React from "react"
import { useAuth } from "@/providers/AuthProvider"

const resetPassword = () => {
  const { session, isLoading } = useAuth()

  return (
    <View>
      <Text>resetPassword</Text>
    </View>
  )
}

export default resetPassword
