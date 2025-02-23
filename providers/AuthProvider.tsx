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
const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url)

  if (errorCode) throw new Error(errorCode)
  const { access_token, refresh_token } = params

  if (!access_token) throw new Error("no access token")

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  })
  if (error) throw error
  return data.session
}

export default function AuthProvider({ children }: PropsWithChildren) {
  const url = Linking.useURL()
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (url) {
      createSessionFromUrl(url)
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
      console.log(event)
      // Handle navigation based on auth state
      if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session) {
        router.replace("/")
      } else if (event === "SIGNED_OUT") {
        router.replace("/sign-in")
      } else if (event === "PASSWORD_RECOVERY") {
        router.replace("/update-password")
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ session, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
