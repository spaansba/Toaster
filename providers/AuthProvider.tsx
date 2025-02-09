import { supabase } from "@/lib/supabase"
import type { Session } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"
import * as Linking from "expo-linking"
import { makeRedirectUri } from "expo-auth-session"
import * as WebBrowser from "expo-web-browser"
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
  // const url = Linking.useURL()
  // console.log(url)
  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      //   console.log(data.session)
      setSession(data.session)
      setIsLoading(false)
    }

    fetchSession()
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setIsLoading(false)
    })
  }, [])

  return <AuthContext.Provider value={{ session, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
