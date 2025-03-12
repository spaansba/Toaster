import { FontAwesome } from "@expo/vector-icons"
import React from "react"
import BaseScreenHeader from "../screen_header/BaseScreenHeader"
import { router } from "expo-router"

type ProfileScreenHeaderProps = {
  title: string
}

const ProfileScreenHeader = ({ title }: ProfileScreenHeaderProps) => {
  return (
    <BaseScreenHeader
      title={title}
      onButtonPress={() => {
        router.push({
          pathname: "/profile/userSettings",
        })
      }}
    >
      <FontAwesome name="cog" color="black" size={26} />
    </BaseScreenHeader>
  )
}

export default ProfileScreenHeader
