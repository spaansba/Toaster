import { isSupbasePostgrestError } from "@/helpers/SupabasePostgrestError"
import React from "react"
import type { FallbackProps } from "react-error-boundary"
import { Pressable, View } from "react-native"
import { ToastText } from "./general/ToastText"

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
        <ToastText className="text-2xl font-courier-bold text-black mb-4">ERROR!</ToastText>
        <ToastText className="text-black mb-6">{getErrorMessage(error)}</ToastText>
        <Pressable onPress={resetErrorBoundary} className="bg-black px-4 py-2 rounded">
          <ToastText className="text-white text-center">Reload Page</ToastText>
        </Pressable>
      </View>
    </View>
  )
}

export default ErrorFallback
