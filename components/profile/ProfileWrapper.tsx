import { Image } from "expo-image"
import { View, Text, SafeAreaView, TouchableOpacity, Pressable } from "react-native"
import React, { useState } from "react"
import { useAuth } from "@/providers/AuthProvider"
import { useQuery } from "@tanstack/react-query"
import { createLoggedInUserQueryOptions } from "@/state/serverState/queryOptions"
import LoadingSpinner from "../LoadingSpinner"
import { ToastText } from "../ToastText"
import ConnectedToastersWrapper from "./ConnectedToastersWrapper"
import images from "@/constants/images"
import AddNewToaster from "./AddNewToaster"

const ProfileWrapper = () => {
  const { session } = useAuth()
  const [activeView, setActiveView] = useState<"connected" | "add">("connected")
  // const { data, isLoading } = useQuery({
  //   ...createLoggedInUserQueryOptions(session?.user.id),
  //   throwOnError: true, // Make error boundary work on Async errors
  // })

  return (
    <SafeAreaView className="bg-primary-200  h-full">
      <View className="items-center pt-5">
        <View className="size-[200px] border-black rounded-full overflow-hidden border-[1px]">
          <Image
            source={images.hoofd}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={0}
          />
        </View>
        <ToastText className="font-courier-bold text-2xl mt-2">Bart</ToastText>
        <ToastText className="font-courier-bold text-xl  text-gray-400">@username</ToastText>
      </View>

      <View className="gap-4 flex-row justify-around pb-3 border-b-[3px] border-black">
        <Pressable onPress={() => setActiveView("connected")}>
          <ToastText
            className={`font-courier-bold mt-5 ${
              activeView === "connected" ? "text-black" : "text-gray-400"
            }`}
          >
            Toasters
          </ToastText>
        </Pressable>
        <Pressable onPress={() => setActiveView("add")}>
          <ToastText
            className={`font-courier-bold mt-5 ${
              activeView === "add" ? "text-black" : "text-gray-400"
            }`}
          >
            Add New Toaster
          </ToastText>
        </Pressable>
      </View>

      {activeView === "connected" ? <ConnectedToastersWrapper /> : <AddNewToaster />}
    </SafeAreaView>
  )
}

export default ProfileWrapper
