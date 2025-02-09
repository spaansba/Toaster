import { View, Text, Image, AppState, Platform } from "react-native"
import React, { useEffect, useState } from "react"
import images from "@/constants/images"
import { Redirect } from "expo-router"
import ToasterButton from "@/components/ToasterButton"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import { supabase } from "@/lib/supabase"
import EmailAuth from "@/components/auth/EmailAuth"
import AppleAuth from "@/components/auth/AppleAuth"
import { useAuth } from "@/providers/AuthProvider"

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function SignIn() {
  const { session, isLoading } = useAuth()
  const [showEmailAuth, setShowEmailAuth] = useState(false)

  if (isLoading) {
    return null // or a loading spinner
  }

  if (session) {
    return <Redirect href="/home" />
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#EDE1D8" }}
      contentContainerClassName="mt-2 h-full"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <View className="h-full">
        <Image source={images.walkingToaster} className="w-full h-[300px]" resizeMode="contain" />
        <View className="flex-1 bg-primary-300 px-7 items-center">
          {!showEmailAuth && (
            <>
              <Text className="uppercase font-courier-bold text-4xl mt-4 mb-5">Continue With</Text>
              {Platform.OS === "ios" && <AppleAuth />}
              <Text className="uppercase font-courier-bold text-1xl my-6">or Continue With</Text>
              <ToasterButton
                title="EMAIL"
                onPress={() => {
                  setShowEmailAuth(true)
                }}
                icon="mail"
                variant="blue"
              />
            </>
          )}
          {showEmailAuth && <EmailAuth />}
        </View>

        {/* Back button at the bottom */}
        {showEmailAuth && (
          <View className="w-full bg-primary-300 px-7 pb-20">
            <View className="w-[60px]">
              <ToasterButton
                onPress={() => {
                  setShowEmailAuth(false)
                }}
                title="<"
                variant="blue"
              />
            </View>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  )
}
