import { View, Text, Pressable } from "react-native"
import React from "react"
import type { FallbackProps } from "react-error-boundary"
import { isSupbasePostgrestError } from "@/helpers/SupabasePostgrestError"

const ErrorFallback = (props: FallbackProps) => {
  const { error, resetErrorBoundary } = props

  const getErrorMessage = (error: Error) => {
    switch (true) {
      case isSupbasePostgrestError(error):
        return `Error ${error.code}`
      default:
        return error.toString()
    }
  }

  return (
    <View style={{ flex: 1 }} className="items-center justify-center p-4">
      <View className="bg-danger p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <Text className="text-2xl font-bold text-black mb-4">ERROR!</Text>
        <Text className="text-black mb-6">{getErrorMessage(error)}</Text>
        <Pressable onPress={resetErrorBoundary} className="bg-black px-4 py-2 rounded">
          <Text className="text-white text-center">Reload Page</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ErrorFallback
