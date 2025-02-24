import { ScrollView, Text, SafeAreaView, TouchableOpacity, Button, View, Alert } from "react-native"
import React from "react"
import { supabase } from "@/lib/supabase"
import { router } from "expo-router"
import ConnectedUsersPictures from "@/components/ConnectedUsersPictures"
import ConnectedToaster from "@/components/profile/ConnectedToaster"
import ConnectedToastersWrapper from "@/components/profile/ConnectedToastersWrapper"
import { ToastText } from "@/components/ToastText"

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
    <SafeAreaView className="bg-primary-200 h-full">
      <View className="flex-1 justify-center content-center mx-5">
        <ToastText className="font-bold text-lg my-10 font-courier-italic">Toaster</ToastText>
        <TouchableOpacity onPress={handleLogout} className="mt-4 bg-red-500 px-4 py-2 rounded-md">
          <ToastText className="text-white">Logout</ToastText>
        </TouchableOpacity>

        <ToastText className="font-courier-bold mt-5">Connected printers</ToastText>
        <ConnectedToastersWrapper />
      </View>
    </SafeAreaView>
  )
}

export default Toaster
