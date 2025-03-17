import { View, Text, Modal, Pressable } from "react-native"
import React, { Children, type ReactNode } from "react"
import { ToastText } from "@/components/general/ToastText"
import PressableText from "@/components/general/PressableText"

type SettingModalWrapperProps = {
  label: string
  isModalVisible: boolean
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  children: ReactNode
}

const SettingModalWrapper = ({
  label,
  isModalVisible,
  setIsModalVisible,
  children,
}: SettingModalWrapperProps) => {
  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View className="h-full bg-primary-200">
        <View className="h-[70px] flex-row items-center justify-between border-b-[1px] border-[#748492] px-5">
          <View className="flex-1">
            <PressableText onPress={() => setIsModalVisible(false)} label="Cancel" isBold={false} />
          </View>
          <View className="flex-1 items-center font-">
            <ToastText className="text-lg font-courier-bold">{label}</ToastText>
          </View>
          <View className="flex-1"></View>
        </View>
        <View className="flex-1">{children}</View>
      </View>
    </Modal>
  )
}

export default SettingModalWrapper
