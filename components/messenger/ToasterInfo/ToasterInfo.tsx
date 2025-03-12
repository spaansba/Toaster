import React from "react"
import { View, ScrollView, Pressable } from "react-native"
import { ToastText } from "@/components/general/ToastText"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Image } from "expo-image"
import ConnectedUsersPictures from "@/components/ConnectedUsersPictures"
import type { ConnectedToaster } from "@/types/types"

type ToasterInfoProps = {
  toaster: ConnectedToaster
}

export default function ToasterInfo({ toaster }: ToasterInfoProps) {
  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {/* Status Bar */}
      <View className="flex-row items-center justify-between px-4 py-2">
        <View className="flex-row items-center">
          <View
            className={`w-2 h-2 rounded-full mr-2 ${
              toaster.isActive ? "bg-green-500" : "bg-gray-400"
            }`}
          />
          <ToastText className="font-courier text-sm">
            {toaster.isActive ? "Active" : "Inactive"}
          </ToastText>
        </View>
        {toaster.deviceId && (
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="bluetooth" size={16} color="black" />
            <ToastText className="ml-1 font-courier text-sm">Connected</ToastText>
          </View>
        )}
      </View>

      {/* Main Content */}
      <View className="px-4">
        {/* Device Info */}
        <View className="flex-row items-center bg-primary-100 rounded-2xl border-[1px] border-black p-3 mb-4">
          <View className="w-16 h-16 rounded-xl overflow-hidden border-[1px] border-black bg-white">
            <Image
              source={toaster.pictureUrl}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={200}
            />
          </View>
          <View className="ml-3 flex-1">
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="clock-outline" size={14} color="black" />
              <ToastText className="ml-1 font-courier text-xs">
                Last used {toaster.lastUsed}
              </ToastText>
            </View>
            <View className="flex-row items-center mt-1">
              <MaterialCommunityIcons name="identifier" size={14} color="black" />
              <ToastText className="ml-1 font-courier text-xs">
                {toaster.deviceId || "No device connected"}
              </ToastText>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row mb-4 space-x-2">
          <Pressable className="flex-1 bg-primary-100 rounded-2xl border-[1px] border-black p-3 items-center">
            <MaterialCommunityIcons name="toaster-oven" size={24} color="black" />
            <ToastText className="font-courier text-sm mt-1">Start Toasting</ToastText>
          </Pressable>
          <Pressable className="flex-1 bg-primary-100 rounded-2xl border-[1px] border-black p-3 items-center">
            <MaterialCommunityIcons name="cog" size={24} color="black" />
            <ToastText className="font-courier text-sm mt-1">Settings</ToastText>
          </Pressable>
        </View>

        {/* Stats */}
        <View className="bg-primary-100 rounded-2xl border-[1px] border-black mb-4">
          <View className="p-3 border-b-[1px] border-black">
            <ToastText className="font-courier-bold">Statistics</ToastText>
          </View>
          <View className="flex-row">
            <View className="flex-1 p-3 items-center border-r-[1px] border-black">
              <ToastText className="text-2xl font-courier-bold">
                {toaster.totalToastsSent}
              </ToastText>
              <ToastText className="font-courier text-xs mt-1">Toasts Sent</ToastText>
            </View>
            <View className="flex-1 p-3 items-center">
              <ToastText className="text-2xl font-courier-bold">
                {toaster.connectedUsers.length}
              </ToastText>
              <ToastText className="font-courier text-xs mt-1">Connected</ToastText>
            </View>
          </View>
        </View>

        {/* Connected Users */}
        <View className="bg-primary-100 rounded-2xl border-[1px] border-black mb-4">
          <View className="p-3 border-b-[1px] border-black">
            <ToastText className="font-courier-bold">Connected Users</ToastText>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="p-3">
            {toaster.connectedUsers.map((user, index) => (
              <View key={user.userId} className="items-center mr-4 last:mr-0">
                <View className="w-14 h-14 rounded-full overflow-hidden border-[1px] border-black mb-2">
                  <Image
                    source={user.pictureUrl}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                    transition={200}
                  />
                </View>
                <ToastText className="font-courier text-xs text-center">{user.username}</ToastText>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  )
}
