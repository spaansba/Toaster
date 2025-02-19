import ErrorFallback from "@/components/ErrorFallback"
import { ErrorBoundary } from "react-error-boundary"
import ProfileWrapper from "@/components/profile/ProfileWrapper"
import { isSupbasePostgrestError } from "@/helpers/SupabasePostgrestError"

export default function profile() {
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
