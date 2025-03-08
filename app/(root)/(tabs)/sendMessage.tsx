import MessengerWrapper from "@/components/messenger/MessengerWrapper"
import { MessagingToasterProvider } from "@/providers/SelectedRecipientProvider"
import React from "react"
import { SafeAreaView } from "react-native"
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated"

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

export default function SendMessage() {
  return (
    <SafeAreaView className="h-full bg-primary-200">
      <MessagingToasterProvider>
        <MessengerWrapper></MessengerWrapper>
      </MessagingToasterProvider>
    </SafeAreaView>
  )
}
