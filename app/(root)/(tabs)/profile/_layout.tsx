import { Stack } from "expo-router"
import React from "react"
import ProfileScreenHeader from "@/components/profile/ProfileScreenHeader"
import UserSettingsScreenHeader from "@/components/user_settings/UserSettingsScreenHeader"
import NestedScreenHeader from "@/components/screen_header/NestedScreenHeader"

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <ProfileScreenHeader title={"Bart Spaans"} />,
          headerTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="userSettings"
        options={{
          headerShown: true,
          headerTitle: "Settings",
          header: () => <NestedScreenHeader title="Settings" />,
        }}
      />
    </Stack>
  )
}

export default ProfileLayout
