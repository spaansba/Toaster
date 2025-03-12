import { Stack } from "expo-router"
import React from "react"
import ProfileScreenHeader from "@/components/profile/ProfileScreenHeader"

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <ProfileScreenHeader title={"Bart Spaans"} />,
          headerTitle: "Profileb nv ",
        }}
      />
      <Stack.Screen
        name="userSettings"
        options={{
          headerShown: true,
          headerTitle: "Settings",
        }}
      />
    </Stack>
  )
}

export default ProfileLayout
