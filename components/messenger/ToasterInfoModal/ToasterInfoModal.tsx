import React from "react"
import { View, Modal, Pressable } from "react-native"
import { Image } from "expo-image"
import { ToastText } from "@/components/general/ToastText"
import ConnectedUsersPictures from "@/components/ConnectedUsersPictures"
import type { BefriendedToaster } from "@/types/types"
import { BlurView } from "expo-blur"
import { MaterialCommunityIcons } from "@expo/vector-icons"

type ToasterInfoModalProps = {
  isVisible: boolean
  onClose: () => void
  toaster: BefriendedToaster
  toastCount?: number
  onToggleFavorite?: () => void
}

export default function ToasterInfoModal({
  isVisible,
  onClose,
  toaster,
  toastCount = 0,
  onToggleFavorite,
}: ToasterInfoModalProps) {
  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
      <BlurView intensity={15} tint="dark" style={{ flex: 1 }}>
        <Pressable className="flex-1 justify-center items-center px-4" onPress={onClose}>
          <Pressable
            className="bg-primary-200 rounded-3xl w-full overflow-hidden border-[1px] border-black"
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header with close button */}
            <View className="flex-row justify-between items-center p-4">
              <Pressable
                className="w-10 h-10 rounded-full items-center justify-center border-[1px] border-black bg-primary-100"
                onPress={onToggleFavorite}
              >
                <MaterialCommunityIcons
                  name={toaster.favorite ? "star" : "star-outline"}
                  size={24}
                  color="black"
                />
              </Pressable>
              <Pressable
                className="w-8 h-8 rounded-full bg-primary-100 items-center justify-center border-[1px] border-black"
                onPress={onClose}
              >
                <MaterialCommunityIcons name="close" size={20} color="black" />
              </Pressable>
            </View>

            {/* Toaster Profile Section */}
            <View className="items-center px-6">
              <View className="w-32 h-32 rounded-full overflow-hidden border-2 border-black bg-white">
                <Image
                  source={toaster.pictureUrl}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                  transition={200}
                />
              </View>

              <ToastText className="text-2xl font-courier-bold mt-4">
                {toaster.toasterName}
              </ToastText>

              <View className="flex-row items-center mt-2">
                <MaterialCommunityIcons name="clock-outline" size={16} color="black" />
                <ToastText className="ml-2 font-courier text-sm">
                  Last message: {toaster.lastSendMessage}
                </ToastText>
              </View>
            </View>

            {/* Stats Section */}
            <View className="flex-row justify-around px-6 py-6">
              <View className="items-center px-6 py-3 rounded-2xl border-[1px] border-black bg-primary-100">
                <ToastText className="text-2xl font-courier-bold">{toastCount}</ToastText>
                <ToastText className="text-sm font-courier">Toasts Sent</ToastText>
              </View>
              <View className="items-center px-6 py-3 rounded-2xl border-[1px] border-black bg-primary-100">
                <ToastText className="text-2xl font-courier-bold">
                  {toaster.connectedUsers.length}
                </ToastText>
                <ToastText className="text-sm font-courier">Connected</ToastText>
              </View>
            </View>

            {/* Connected Users Section */}
            <View className="px-6 pb-4">
              <ToastText className="text-lg font-courier-bold mb-3">Connected Users</ToastText>
              <View className="flex-row items-center p-4 rounded-2xl border-[1px] border-black bg-primary-100">
                <ConnectedUsersPictures
                  connectedUsers={toaster.connectedUsers}
                  size={40}
                  maxVisibleUsers={5}
                  backgroundColor="#fff3e1"
                />
                <ToastText className="ml-4 font-courier">
                  {toaster.connectedUsers.length} users connected
                </ToastText>
              </View>
            </View>

            {/* Additional Info */}
            <View className="px-6 pb-6">
              <View className="rounded-2xl p-4 border-[1px] border-black bg-primary-100">
                <View className="flex-row items-center">
                  <MaterialCommunityIcons name="identifier" size={20} color="black" />
                  <ToastText className="ml-2 font-courier">ID: {toaster.toasterId}</ToastText>
                </View>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </BlurView>
    </Modal>
  )
}
