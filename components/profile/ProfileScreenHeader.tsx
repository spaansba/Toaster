import { FontAwesome } from "@expo/vector-icons"
import React from "react"
import BaseScreenHeader from "../ScreenHeader/BaseScreenHeader"

type ProfileScreenHeaderProps = {
  title: string
}

const ProfileScreenHeader = ({ title }: ProfileScreenHeaderProps) => {
  return (
    <BaseScreenHeader title={title} onButtonPress={() => {}}>
      <FontAwesome name="cog" color="black" size={26} />
    </BaseScreenHeader>
  )
}

export default ProfileScreenHeader
