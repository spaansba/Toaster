import { ToastText } from "@/components/general/ToastText"
import { supabase } from "@/lib/supabase"
import React from "react"
import { Pressable } from "react-native"
import Toast from "react-native-toast-message"

const LogoutButton = () => {
  const HandleLogoutPress = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      Toast.show({
        type: "error",
        text1: "Sign-out Error",
        text2: error.message,
      })
      console.error(`sign-out error, ${error.message} `)
    }
  }
  return (
    <Pressable onPress={HandleLogoutPress} className="px-5 py-5 border-t-[1px] border-[#748492]">
      {({ pressed }) => (
        <ToastText
          className={`${pressed ? "text-black" : "text-danger"} font-courier-bold text-lg `}
        >
          Logout
        </ToastText>
      )}
    </Pressable>
  )
}

export default LogoutButton
