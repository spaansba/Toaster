import { useAuth } from "@/providers/AuthProvider"
import { router } from "expo-router"
import { useEffect } from "react"
import { ActivityIndicator } from "react-native"

export default function App() {
  const { session, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (session) {
        router.replace("/profile")
      } else {
        router.replace("/sign-in")
      }
    }
  }, [session, isLoading])

  if (isLoading) {
    return <ActivityIndicator />
  }

  return null
}
