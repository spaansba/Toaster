import { View, Text } from "react-native"
import React from "react"
import { useRecipientsStore } from "@/providers/RecipientsStore"
import { ToastText } from "../general/ToastText"

const SelectedRecipientList = () => {
  const SelectedRecipientList = useRecipientsStore((state) => state.SelectedRecipients)
  return (
    <View>
      <ToastText>{SelectedRecipientList.length}</ToastText>
    </View>
  )
}

export default SelectedRecipientList
