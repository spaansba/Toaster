import { Text, SafeAreaView, TouchableOpacity, Button } from "react-native"
import React from "react"
import { supabase } from "@/lib/supabase"
import { router } from "expo-router"

const Toaster = () => {
  const handleLogout = async () => {
    try {
      // This will automatically rerout to /sign-in
      const { error } = await supabase.auth.signOut()
      if (error) throw error
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
      <Text className="font-bold text-lg my-10 font-courier-italic">Toaster</Text>
      <TouchableOpacity onPress={handleLogout} className="mt-4 bg-red-500 px-4 py-2 rounded-md">
        <Text className="text-white font-semibold">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Toaster
