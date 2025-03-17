import { View, Text, Modal, Pressable } from "react-native"
import React, { useState } from "react"
import SettingMenuItem from "../SettingMenuItem"
import RecipientModalHeaders from "@/components/messenger/RecipientModal/RecipientModalHeaders"
import { ToastText } from "@/components/general/ToastText"
import SettingModalWrapper from "../SettingModalWrapper"

const BugReportSetting = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  return (
    <>
      <SettingMenuItem
        ionIcon="bug"
        label="Report a Bug"
        onPress={() => {
          setIsModalVisible(true)
        }}
      />
      <SettingModalWrapper
        label="Bug Report"
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      >
        <View className="size-20 bg-black"></View>
      </SettingModalWrapper>
    </>
  )
}

export default BugReportSetting
