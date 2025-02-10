import { View, Text, Image, AppState, Platform, ScrollView } from "react-native"
import React, { useState } from "react"
import images from "@/constants/images"
import { Redirect, router } from "expo-router"
import ToasterButton from "@/components/ToasterButton"
import AppleAuth from "@/components/auth/AppleAuth"
import { useAuth } from "@/providers/AuthProvider"

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
    <ScrollView className="bg-mainBackground">
      <View className="h-full">
        <Image source={images.walkingToaster} className="w-full h-[300px]" resizeMode="contain" />
        <View className="flex-1 bg-primary-300 px-7 items-center">
          <>
            <Text className="uppercase font-courier-bold text-4xl mt-4 mb-5">Continue With</Text>
            {Platform.OS === "ios" && <AppleAuth />}
            <Text className="uppercase font-courier-bold text-1xl my-6">or Continue With</Text>
            <ToasterButton
              title="EMAIL"
              onPress={() => {
                router.push("/email/emailAuth")
              }}
              icon="mail"
              variant="blue"
            />
          </>
        </View>
      </View>
    </ScrollView>
  )
}
