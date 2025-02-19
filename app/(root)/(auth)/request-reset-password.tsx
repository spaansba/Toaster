import React, { useState } from "react"
import { Alert, Text, View } from "react-native"
import ToasterButton from "@/components/ToasterButton"
import ToasterInput from "@/components/ToasterInput"
import { supabase } from "@/lib/supabase"
import { makeRedirectUri } from "expo-auth-session"
import { router, useLocalSearchParams } from "expo-router"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import images from "@/constants/images"
import { Image } from "expo-image"
import { useAuth } from "@/providers/AuthProvider"
const RequestResetPassword = () => {
  const { inputEmail } = useLocalSearchParams<{ inputEmail: string }>()
  const [email, setEmail] = useState(inputEmail || "")
  const [isResetting, setIsResetting] = useState(false)
  const [emailErrors, setEmailErrors] = useState<string[]>([])
  const { session } = useAuth()

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
        if (error.message.includes("Email not found")) {
          setEmailErrors(["No account found with this email address"])
        } else {
          Alert.alert("Error", error.message)
        }
      } else {
        Alert.alert(
          "Check your email",
          "We've sent you a password reset link. Please check your inbox."
        )
      }
    } catch (error) {
      console.error("Password reset error:", error)
      Alert.alert("Error", "An unexpected error occurred while resetting password")
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
          <Text className="font-courier-bold text-2xl mb-2">Reset Password</Text>
          <Text className="font-courier text-gray-600">
            Enter your email address and we'll send you instructions to reset your password.
          </Text>
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
          <Text className="text-blue-500 text-sm font-courier" onPress={() => router.back()}>
            Back to Sign In
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default RequestResetPassword
