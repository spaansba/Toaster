import ErrorFallback from "@/components/ErrorFallback"
import ProfileScreenHeader from "@/components/profile/ProfileScreenHeader"
import ProfileWrapper from "@/components/profile/ProfileWrapper"
import { isSupbasePostgrestError } from "@/helpers/SupabasePostgrestError"
import { useNavigation } from "expo-router"
import React, { useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { View } from "react-native"

export default function UserSettingsPage() {
  const navigation = useNavigation()

  // Move the setOptions call to a useEffect
  useEffect(() => {
    navigation.setOptions({
      header: () => <ProfileScreenHeader title={"Bart Spaans"} />,
    })
  }, [navigation])

  return <View></View>
}
