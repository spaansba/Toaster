import { supabase } from "@/lib/supabase"
import type { Session } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"
import * as Linking from "expo-linking"
import { makeRedirectUri } from "expo-auth-session"
import * as WebBrowser from "expo-web-browser"
import * as QueryParams from "expo-auth-session/build/QueryParams"

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
  const url = Linking.useURL()

  useEffect(() => {
    if (url) {
      const { params, errorCode } = QueryParams.getQueryParams(url)
      if (params?.access_token) {
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
      setSession(data.session)
      setIsLoading(false)
    }

    fetchSession()
    supabase.auth.onAuthStateChange((e, session) => {
      console.log("event", e)
      if (e === "PASSWORD_RECOVERY") {
      }
      setSession(session)
      setIsLoading(false)
    })
  }, [])

  return <AuthContext.Provider value={{ session, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
