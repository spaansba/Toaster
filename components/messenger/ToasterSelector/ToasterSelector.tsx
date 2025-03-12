import React from "react"
import { View, Modal, Pressable } from "react-native"
import { ToastText } from "@/components/general/ToastText"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { BlurView } from "expo-blur"
import type { ConnectedToaster } from "@/types/types"

type ToasterSelectorProps = {
  toasters: ConnectedToaster[]
  selectedToaster: ConnectedToaster | null
  onSelect: (toaster: ConnectedToaster) => void
  isOpen: boolean
  onClose: () => void
}

export default function ToasterSelector({
  toasters,
  selectedToaster,
  onSelect,
  isOpen,
  onClose,
}: ToasterSelectorProps) {
  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <BlurView intensity={20} tint="dark" style={{ flex: 1 }}>
        <Pressable className="flex-1 justify-center items-center px-4" onPress={onClose}>
          <Pressable
            className="bg-primary-200 w-full rounded-3xl border-[1px] border-black overflow-hidden"
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View className="flex-row justify-between items-center p-4 border-b-[1px] border-black">
              <ToastText className="text-xl font-courier-bold">Select Toaster</ToastText>
              <Pressable
                className="w-8 h-8 rounded-full items-center justify-center border-[1px] border-black bg-primary-100"
                onPress={onClose}
              >
                <MaterialCommunityIcons name="close" size={20} color="black" />
              </Pressable>
            </View>

            {/* Toaster List */}
            {toasters.map((toaster, index) => (
              <Pressable
                key={toaster.toasterId}
                onPress={() => {
                  onSelect(toaster)
                  onClose()
                }}
                className={`p-4 flex-row items-center justify-between border-b-[1px] border-black
                  ${selectedToaster?.toasterId === toaster.toasterId ? "bg-primary-100" : ""}
                  ${index === toasters.length - 1 ? "border-b-0" : ""}`}
              >
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 rounded-2xl overflow-hidden border-[1px] border-black mr-3">
                    <Image
                      source={toaster.pictureUrl}
                      style={{ width: "100%", height: "100%" }}
                      contentFit="cover"
                      transition={200}
                    />
                  </View>
                  <View>
                    <ToastText className="font-courier-bold">{toaster.toasterName}</ToastText>
                    <View className="flex-row items-center mt-1">
                      <View
                        className={`w-2 h-2 rounded-full mr-2 ${
                          toaster.isActive ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                      <ToastText className="font-courier text-sm text-gray-600">
                        {toaster.isActive ? "Active" : "Inactive"}
                      </ToastText>
                    </View>
                  </View>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={selectedToaster?.toasterId === toaster.toasterId ? "black" : "#666"}
                />
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </BlurView>
    </Modal>
  )
}
