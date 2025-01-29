import { View, SafeAreaView, Text } from "react-native"
import React from "react"
import { useLocalSearchParams } from "expo-router"

const Property = () => {
  const { id } = useLocalSearchParams()
  return (
    <SafeAreaView>
      <Text>Property</Text>
    </SafeAreaView>
  )
}

export default Property
