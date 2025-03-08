import { FontAwesome } from "@expo/vector-icons"
import React from "react"
import BaseScreenHeader from "../ScreenHeader/BaseScreenHeader"

type ProfileScreenHeaderProps = {
  title: string
}

const ProfileScreenHeader = ({ title }: ProfileScreenHeaderProps) => {
  return (
    <BaseScreenHeader title={title} onPress={() => {}}>
      <FontAwesome name="cog" size={24} color="black" />
    </BaseScreenHeader>
  )
}

export default ProfileScreenHeader
