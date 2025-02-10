import React, { useState } from "react"
import ToasterButton from "@/components/ToasterButton"
import ToasterInput from "@/components/ToasterInput"
import { supabase } from "@/lib/supabase"
import { Alert, Text, View, Pressable } from "react-native"
import { makeRedirectUri } from "expo-auth-session"

type PasswordResetProps = {
  onBack: () => void
  inputEmail?: string
}

const PasswordReset = ({ onBack, inputEmail }: PasswordResetProps) => {
  const [email, setEmail] = useState(inputEmail || "")
  const [isResetting, setIsResetting] = useState(false)
  const [emailErrors, setEmailErrors] = useState<string[]>([])

  async function resetPassword() {
    setIsResetting(true)
    try {
      const redirectTo = makeRedirectUri({
        scheme: "com.toaster",
        path: "home",
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
        onBack()
      }
    } catch (error) {
      console.error("Password reset error:", error)
      Alert.alert("Error", "An unexpected error occurred while resetting password")
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <View className="w-full">
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
        title={isResetting ? "SENDING..." : "SEND RESET LINK"}
        disabled={isResetting || !email}
        loading={isResetting}
        onPress={resetPassword}
        variant="blue"
      />

      <Pressable onPress={onBack} className="mt-6">
        <Text className="text-blue-500 text-sm font-courier text-center">Back to Sign In</Text>
      </Pressable>
    </View>
  )
}

export default PasswordReset
