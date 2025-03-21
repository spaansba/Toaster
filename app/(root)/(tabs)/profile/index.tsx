import ErrorFallback from "@/components/ErrorFallback"
import ProfileWrapper from "@/components/profile/ProfileWrapper"
import { isSupbasePostgrestError } from "@/helpers/SupabasePostgrestError"
import React from "react"
import { ErrorBoundary } from "react-error-boundary"

export default function Profile() {
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
