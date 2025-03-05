import React, { useState, useRef, useEffect } from "react"
import { ScrollView, StyleSheet } from "react-native"
import { useNavigation } from "expo-router"
import ErrorFallback from "@/components/ErrorFallback"
import { ErrorBoundary } from "react-error-boundary"
import ProfileWrapper from "@/components/profile/ProfileWrapper"
import { isSupbasePostgrestError } from "@/helpers/SupabasePostgrestError"
import CustomProfileHeader from "@/components/profile/CustomProfileHeader"

export default function Profile() {
  const [headerTitle, setHeaderTitle] = useState("Bart Spaans")
  const navigation = useNavigation()
  navigation.setOptions({
    header: () => <CustomProfileHeader title={headerTitle} />,
  })

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        console.log("error boundary error log: ", error)
        if (isSupbasePostgrestError(error)) {
          console.log(error.name)
        }
      }}
    >
      <ProfileWrapper />
    </ErrorBoundary>
  )
}
