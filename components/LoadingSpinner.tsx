import { View, Text, Animated, ActivityIndicator } from "react-native"
import React, { useEffect } from "react"

const LoadingSpinner = () => {
  return (
    <View className="flex items-center justify-center h-full">
      <ActivityIndicator size={"large"} color={"#FF69B4"}></ActivityIndicator>
    </View>
  )
}

export default LoadingSpinner
