import ErrorFallback from "@/components/ErrorFallback"
import ProfileScreenHeader from "@/components/profile/ProfileScreenHeader"
import ProfileWrapper from "@/components/profile/ProfileWrapper"
import { isSupbasePostgrestError } from "@/helpers/SupabasePostgrestError"
import { useNavigation } from "expo-router"
import React, { useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"

export default function Profile() {
  const navigation = useNavigation()

  // Move the setOptions call to a useEffect
  useEffect(() => {
    navigation.setOptions({
      header: () => <ProfileScreenHeader title={"Bart Spaans"} />,
    })
  }, [navigation])

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
