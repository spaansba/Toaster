import { View } from "react-native"
import React from "react"
import ProfilePicture from "@/components/ProfilePicture"
import { ToastText } from "@/components/general/ToastText"
import type { BaseUser } from "@/types/types"

type UserSettingProfileHeaderProps = {
  user: BaseUser
}

const UserSettingProfileHeader = () => {
  return (
    <View className="flex justify-center items-center">
      <ProfilePicture size={100} />
      <ToastText className="font-courier-bold text-2xl mt-[6px]">Bart Spaans</ToastText>
      <ToastText className="text-lg mt-[-4px]">@BartSpaans</ToastText>
    </View>
  )
}

export default UserSettingProfileHeader
