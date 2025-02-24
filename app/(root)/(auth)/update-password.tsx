import { View } from "react-native"
import ToasterButton from "@/components/ToasterButton"
import ToasterInput from "@/components/ToasterInput"
import { supabase } from "@/lib/supabase"
import { router } from "expo-router"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import images from "@/constants/images"
import { Image } from "expo-image"
import { useState } from "react"
import Toast from "react-native-toast-message"
import { WeakPasswordHelper } from "@/helpers/WeakPasswordHelper"
import { AuthWeakPasswordError } from "@supabase/supabase-js"
import { ToastText } from "@/components/ToastText"

const UpdatePassword = () => {
  const [password, setPassword] = useState("")
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const [isUpdating, setIsUpdating] = useState(false)

  const updatePassword = async () => {
    setIsUpdating(true)
    const { data, error } = await supabase.auth.updateUser({ password: password })
    if (error) {
      switch (error.code) {
        case "weak_password":
          if (error instanceof AuthWeakPasswordError) {
            setPasswordErrors(WeakPasswordHelper(error))
          } else {
            setPasswordErrors([
              "Your password needs the following characters:\n• At least one uppercase letter (A-Z)\n• At least one lowercase letter (a-z)\n• At least one number (0-9)\n• At least 6 characters long",
            ])
          }
          break
        default:
          console.error("Password recovery error", error)
          Toast.show({
            type: "error",
            text1: "Password Recovery Error",
            text2: "An unexpected error occured during password recovery, try again",
          })
          break
      }
      return
    }
    if (data) {
      Toast.show({
        type: "success",
        text1: "Update Successfull",
        text2: "Password has been updated",
      })
    }
    setIsUpdating(false)
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
          <ToastText className=" text-gray-600">
            Enter your email address and we'll send you instructions to reset your password.
          </ToastText>
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
          className="w-full h-[55px]"
          content={{
            type: "text",
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
          <ToastText className="text-blue-500 text-sm " onPress={() => router.back()}>
            Back to Sign In
          </ToastText>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default UpdatePassword
