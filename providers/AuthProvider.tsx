import { supabase } from "@/lib/supabase"
import type { Session } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"
import * as Linking from "expo-linking"
import * as QueryParams from "expo-auth-session/build/QueryParams"
import { router } from "expo-router"
import Toast from "react-native-toast-message"

type AuthData = {
  session: Session | null
  isLoading: boolean
}

const AuthContext = createContext<AuthData>({
  session: null,
  isLoading: true,
})

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const url = Linking.useURL()

  useEffect(() => {
    if (url) {
      const { params, errorCode } = QueryParams.getQueryParams(url)
      console.log(params)
      if (params.error_description === "Email link is invalid or has expired") {
        Toast.show({
          type: "error",
          text1: "Password Reset Failed",
          text2: params.error_description || "Link is invalid or expired",
        })
        router.replace("/request-reset-password")
        return
      }
      if (params.access_token) {
        // This emits a SIGNED_IN event, which if we are trying to reset password from email auth page is going to fire onAuthStateChange > rerout to homepage
        // Thats why we set the isResettingPassword boolean
        setIsResettingPassword(() => true)
        supabase.auth
          .setSession({
            access_token: params.access_token,
            refresh_token: params.refresh_token,
          })
          .then(({ data, error }) => {
            if (error) console.error("Error setting session:", error)
            else setSession(data.session)
          })
      }
    }
  }, [url])

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error(error)
        Toast.show({
          type: "error",
          text1: "Authentication Error",
          text2: error?.message,
        })
      }
      setSession(data.session)
      setIsLoading(false)
    }

    fetchSession()
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setIsLoading(false)
      console.log("event", event)
      console.log("isResettingPass", isResettingPassword)
      // Handle navigation based on auth state
      if (
        (event === "SIGNED_IN" || event === "INITIAL_SESSION") &&
        session &&
        !isResettingPassword
      ) {
        router.replace("/")
      } else if (event === "SIGNED_OUT") {
        router.replace("/sign-in")
      } else if (event === "PASSWORD_RECOVERY") {
        router.replace("/update-password")
      }
    })
    setIsResettingPassword(false)

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ session, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
