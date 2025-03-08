import MessengerScreenHeader from "@/components/messenger/MessengerScreenHeader"
import MessengerWrapper from "@/components/messenger/MessengerWrapper"
import { MessagingToasterProvider } from "@/providers/SelectedRecipientProvider"
import { useNavigation } from "expo-router"
import React, { useEffect } from "react"
import { SafeAreaView } from "react-native"
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated"

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

export default function SendMessage() {
  const navigation = useNavigation()
  // Move the setOptions call to a useEffect
  useEffect(() => {
    navigation.setOptions({
      header: () => <MessengerScreenHeader />,
    })
  }, [navigation])

  return (
    <SafeAreaView className="h-full bg-primary-200">
      <MessagingToasterProvider>
        <MessengerWrapper></MessengerWrapper>
      </MessagingToasterProvider>
    </SafeAreaView>
  )
}
