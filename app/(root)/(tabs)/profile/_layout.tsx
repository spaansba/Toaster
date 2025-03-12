import { Stack } from "expo-router"
import React from "react"
import ProfileScreenHeader from "@/components/profile/ProfileScreenHeader"
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
          header: () => <NestedScreenHeader title="settings" />,
        }}
      />
    </Stack>
  )
}

export default ProfileLayout
