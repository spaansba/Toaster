import { ToastText } from "@/components/general/ToastText"
import ToasterButton from "@/components/ToasterButton"
import ToasterInput from "@/components/ToasterInput"
import images from "@/constants/images"
import { supabase } from "@/lib/supabase"
import { makeRedirectUri } from "expo-auth-session"
import { Image } from "expo-image"
import { router, useLocalSearchParams } from "expo-router"
import React, { useState } from "react"
import { View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import Toast from "react-native-toast-message"
const RequestResetPassword = () => {
  const { inputEmail } = useLocalSearchParams<{ inputEmail: string }>()
  const [email, setEmail] = useState(inputEmail || "")
  const [isResetting, setIsResetting] = useState(false)
  const [emailErrors, setEmailErrors] = useState<string[]>([])

  async function ResetPassword() {
    setIsResetting(true)
    try {
      const redirectTo = makeRedirectUri({
        scheme: "com.toaster",
        path: "update-password",
      })
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectTo,
      })

      if (error) {
        if (error.code === "over_email_send_rate_limit") {
          setEmailErrors(["Not too fast, check your mail first"])
        } else {
          console.log(error.code)
          setEmailErrors([error.message])
          console.error("Unexpected error while trying to reset password ", error)
        }
      } else {
        Toast.show({
          type: "general",
          text1: "Check Your Mail",
          text2: "This mail might end up in your spam folder",
          props: {
            ionIcon: "mail-unread-outline",
          },
          visibilityTime: 5000,
        })
      }
    } catch (error) {
      console.error("Password reset error:", error)
      console.error("Unexpected error while trying to reset password ", error)
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unexpected error while trying to reset password",
      })
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <KeyboardAwareScrollView
      className="bg-primary-200 flex-1"
      contentContainerClassName="mt-6 h-full"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <Image
        source={images.walkingToaster}
        style={{ width: "100%", height: 200 }}
        contentFit="contain"
        cachePolicy="memory-disk"
        transition={0}
      />
      <View className="px-7">
        <View className="mb-8">
          <ToastText className="font-courier-bold text-2xl mb-2">Reset Password</ToastText>
          <ToastText className="text-gray-600">
            Enter your email address and we'll send you instructions to reset your password.
          </ToastText>
        </View>

        <ToasterInput
          label="EMAIL ADDRESS"
          onChangeText={(text) => setEmail(text.trim())}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="done"
          errors={emailErrors}
        />

        <ToasterButton
          className="w-full h-[55px]"
          content={{
            type: "text",
            text: "SEND RESET LINK",
            updating: { isUpdating: isResetting, updateText: "SENDING..." },
          }}
          disabled={isResetting || !email}
          loading={isResetting}
          onPress={ResetPassword}
          variant="blue"
        />

        <View className="items-center mt-4">
          <ToastText className="text-blue-500 text-sm" onPress={() => router.back()}>
            Back to Sign In
          </ToastText>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default RequestResetPassword
