import React from "react"
import { ActivityIndicator, View } from "react-native"

const LoadingSpinner = () => {
  return (
    <View className="flex items-center justify-center h-full">
      <ActivityIndicator size={"large"} color={"#FF69B4"}></ActivityIndicator>
    </View>
  )
}

export default LoadingSpinner
