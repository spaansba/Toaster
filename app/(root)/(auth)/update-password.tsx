import { Text, View } from "react-native"
import ToasterButton from "@/components/ToasterButton"
import ToasterInput from "@/components/ToasterInput"
import { supabase } from "@/lib/supabase"
import { makeRedirectUri } from "expo-auth-session"
import { router } from "expo-router"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import images from "@/constants/images"
import { Image } from "expo-image"
import { useState } from "react"

const UpdatePassword = () => {
  const [password, setPassword] = useState("")
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const [isUpdating, setIsUpdating] = useState(false)

  const updatePassword = async () => {
    setIsUpdating(true)
    const { data, error } = await supabase.auth.updateUser({ password: password })
    console.log(data)
    console.log(error)
    if (data) alert("Password updated successfully!")
    if (error) alert(error)
    setIsUpdating(false)
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#EDE1D8" }}
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
          label="NEW PASSWORD"
          onChangeText={setPassword}
          value={password}
          placeholder="*********"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="done"
          errors={passwordErrors}
        />

        <ToasterButton
          title={{
            text: "Update Password",
            updating: {
              updateText: "Updating Password...",
              isUpdating: isUpdating,
            },
          }}
          disabled={isUpdating || !password}
          loading={isUpdating}
          onPress={updatePassword}
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

export default UpdatePassword
