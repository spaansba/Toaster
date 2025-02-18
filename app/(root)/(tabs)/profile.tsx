import { useState, useEffect } from "react"
import { View, Text } from "react-native"

import { supabase } from "@/lib/supabase"
import { useAuth } from "@/providers/AuthProvider"
import { SafeAreaView } from "react-native-safe-area-context"

export default function profile() {
  const { session } = useAuth()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error("No user on the session!")

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, avatar_url`)
        .eq("id", session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error: any) {
      console.log(error)
      alert(error?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text className="size-10 bg-slate-300 font-bold text-black">{username}</Text>
      </View>
      <View>
        <Text>{avatarUrl}</Text>
      </View>
    </SafeAreaView>
  )
}
