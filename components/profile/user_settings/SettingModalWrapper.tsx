import { View, Text, Modal, Pressable } from "react-native"
import React, { Children, type ReactNode } from "react"
import { ToastText } from "@/components/general/ToastText"
import PressableText from "@/components/general/PressableText"
import {
  KeyboardAvoidingView,
  KeyboardStickyView,
  KeyboardToolbar,
} from "react-native-keyboard-controller"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { Toolbar } from "@10play/tentap-editor"
import { TextInput } from "react-native-gesture-handler"
import { useForm } from "@tanstack/react-form"

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
  const form = useForm({
    onSubmit: async ({ value }) => {
      console.log(value)
    },
    defaultValues: {
      email: "",
    },
  })

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View className="h-full bg-primary-200">
        <KeyboardAvoidingView className="px-5 py-5 flex-1">
          <form.Field
            name="email"
            children={(field) => (
              <View className="">
                <TextInput
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChangeText={field.handleChange}
                  placeholder="example@toaster.com"
                  spellCheck={true}
                  textContentType="emailAddress"
                />
              </View>
            )}
          />
        </KeyboardAvoidingView>
        <KeyboardToolbar />
      </View>
    </Modal>
  )
}

export default SettingModalWrapper
