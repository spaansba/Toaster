import ErrorFallback from "@/components/ErrorFallback"
import CustomProfileHeader from "@/components/profile/CustomProfileHeader"
import ProfileWrapper from "@/components/profile/ProfileWrapper"
import { isSupbasePostgrestError } from "@/helpers/SupabasePostgrestError"
import { useNavigation } from "expo-router"
import React, { useState } from "react"
import { ErrorBoundary } from "react-error-boundary"

export default function Profile() {
  const [headerTitle] = useState("Bart Spaans")
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
