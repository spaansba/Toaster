import { Text, SafeAreaView, TouchableOpacity } from "react-native"
import React from "react"
import { Link, router } from "expo-router"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/providers/AuthProvider"

const home = () => {
  const { session } = useAuth()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.replace("/sign-in")
      // After signing out, router will automatically redirect to sign-in
      // because of the auth check in root layout
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <SafeAreaView
      className="bg-primary-200"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold text-lg my-10 font-courier-italic">Hello</Text>
      <TouchableOpacity onPress={handleLogout} className="mt-4 bg-red-500 px-4 py-2 rounded-md">
        <Text className="text-white font-semibold">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default home
